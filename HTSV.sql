
CREATE DATABASE QuanLyHocTap;   -- CampusHub
GO
USE QuanLyHocTap;
GO

/* =====================================================================
   1. NGƯỜI DÙNG & PHÂN QUYỀN (RBAC)
   ===================================================================== */

CREATE TABLE NguoiDung (
    Id            INT IDENTITY(1,1) PRIMARY KEY,
    Username      NVARCHAR(50)  NOT NULL UNIQUE,
    Email         NVARCHAR(255) NOT NULL UNIQUE,
    PasswordHash  NVARCHAR(255) NOT NULL,
    FullName      NVARCHAR(150) NOT NULL,
    IsActive      BIT           NOT NULL DEFAULT 1,   -- xoá mềm thay vì DELETE
    CreatedAt     DATETIME2     NOT NULL DEFAULT SYSUTCDATETIME(),
    UpdatedAt     DATETIME2     NULL
);

CREATE TABLE VaiTro (
    Id    INT IDENTITY(1,1) PRIMARY KEY,
    Code  NVARCHAR(30)  NOT NULL UNIQUE,   -- ADMIN / LECTURER / STUDENT
    Name  NVARCHAR(100) NOT NULL
);

CREATE TABLE Quyen (
    Id           INT IDENTITY(1,1) PRIMARY KEY,
    Code         NVARCHAR(60)  NOT NULL UNIQUE,
    Name         NVARCHAR(150) NOT NULL,
    Description  NVARCHAR(300) NULL
);

CREATE TABLE NguoiDung_VaiTro (
    UserId INT NOT NULL,
    RoleId INT NOT NULL,
    CONSTRAINT PK_NguoiDung_VaiTro PRIMARY KEY (UserId, RoleId),
    CONSTRAINT FK_NDVT_NguoiDung FOREIGN KEY (UserId) REFERENCES NguoiDung(Id) ON DELETE CASCADE,
    CONSTRAINT FK_NDVT_VaiTro    FOREIGN KEY (RoleId) REFERENCES VaiTro(Id) ON DELETE CASCADE
);

CREATE TABLE VaiTro_Quyen (
    RoleId       INT NOT NULL,
    PermissionId INT NOT NULL,
    CONSTRAINT PK_VaiTro_Quyen PRIMARY KEY (RoleId, PermissionId),
    CONSTRAINT FK_VTQ_VaiTro FOREIGN KEY (RoleId) REFERENCES VaiTro(Id) ON DELETE CASCADE,
    CONSTRAINT FK_VTQ_Quyen  FOREIGN KEY (PermissionId) REFERENCES Quyen(Id) ON DELETE CASCADE
);

-- Hồ sơ mở rộng 1-1
CREATE TABLE SinhVien (
    UserId         INT PRIMARY KEY,
    StudentCode    NVARCHAR(20)  NOT NULL UNIQUE,   -- MSSV
    ClassName      NVARCHAR(50)  NULL,
    Major          NVARCHAR(100) NULL,
    EnrollmentYear INT           NULL,
    CONSTRAINT FK_SinhVien_NguoiDung FOREIGN KEY (UserId) REFERENCES NguoiDung(Id) ON DELETE CASCADE
);

CREATE TABLE GiangVien (
    UserId       INT PRIMARY KEY,
    LecturerCode NVARCHAR(20)  NOT NULL UNIQUE,
    Department   NVARCHAR(100) NULL,
    Title        NVARCHAR(50)  NULL,              -- ThS, TS...
    CONSTRAINT FK_GiangVien_NguoiDung FOREIGN KEY (UserId) REFERENCES NguoiDung(Id) ON DELETE CASCADE
);
GO

/* =====================================================================
   2. CONFESSION
   ===================================================================== */

CREATE TABLE DanhMucConfession (
    Id    INT IDENTITY(1,1) PRIMARY KEY,
    Name  NVARCHAR(100) NOT NULL,
    Slug  NVARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE BaiConfession (
    Id                INT IDENTITY(1,1) PRIMARY KEY,
    AuthorUserId      INT NOT NULL,               -- LUÔN là tác giả thật, kể cả ẩn danh
    CategoryId        INT NULL,
    Content           NVARCHAR(MAX) NOT NULL,
    IsAnonymous       BIT NOT NULL DEFAULT 0,
    Status            NVARCHAR(20) NOT NULL DEFAULT 'PENDING',
    RejectReason      NVARCHAR(300) NULL,
    CreatedAt         DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    ApprovedAt        DATETIME2 NULL,
    ApprovedByUserId  INT NULL,
    CONSTRAINT FK_Conf_Author   FOREIGN KEY (AuthorUserId) REFERENCES NguoiDung(Id),
    CONSTRAINT FK_Conf_Category FOREIGN KEY (CategoryId)   REFERENCES DanhMucConfession(Id),
    CONSTRAINT CK_Conf_Status CHECK (Status IN ('PENDING','APPROVED','REJECTED','HIDDEN'))
);

CREATE TABLE BinhLuan (
    Id           INT IDENTITY(1,1) PRIMARY KEY,
    ConfessionId INT NOT NULL,
    AuthorUserId INT NOT NULL,
    Content      NVARCHAR(MAX) NOT NULL,
    IsAnonymous  BIT NOT NULL DEFAULT 0,
    CreatedAt    DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT FK_BinhLuan_Conf FOREIGN KEY (ConfessionId) REFERENCES BaiConfession(Id) ON DELETE CASCADE,
    CONSTRAINT FK_BinhLuan_User FOREIGN KEY (AuthorUserId) REFERENCES NguoiDung(Id)
);

CREATE TABLE LuotThich (
    Id           INT IDENTITY(1,1) PRIMARY KEY,
    ConfessionId INT NOT NULL,
    UserId       INT NOT NULL,
    Type         NVARCHAR(20) NOT NULL DEFAULT 'LIKE',
    CreatedAt    DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT FK_LuotThich_Conf FOREIGN KEY (ConfessionId) REFERENCES BaiConfession(Id) ON DELETE CASCADE,
    CONSTRAINT FK_LuotThich_User FOREIGN KEY (UserId) REFERENCES NguoiDung(Id),
    CONSTRAINT UQ_LuotThich UNIQUE (ConfessionId, UserId, Type)   -- chặn like trùng
);

CREATE TABLE BaoCao (
    Id             INT IDENTITY(1,1) PRIMARY KEY,
    ConfessionId   INT NULL,
    CommentId      INT NULL,
    ReporterUserId INT NOT NULL,
    Reason         NVARCHAR(300) NOT NULL,
    Status         NVARCHAR(20) NOT NULL DEFAULT 'OPEN',
    CreatedAt      DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT FK_BaoCao_Conf    FOREIGN KEY (ConfessionId) REFERENCES BaiConfession(Id),
    CONSTRAINT FK_BaoCao_Comment FOREIGN KEY (CommentId) REFERENCES BinhLuan(Id),
    CONSTRAINT FK_BaoCao_User    FOREIGN KEY (ReporterUserId) REFERENCES NguoiDung(Id),
    CONSTRAINT CK_BaoCao_Target CHECK (ConfessionId IS NOT NULL OR CommentId IS NOT NULL)
);

-- Audit kiểm duyệt: lưu vết ai xem/xử lý (kể cả bài ẩn danh)
CREATE TABLE NhatKyKiemDuyet (
    Id              INT IDENTITY(1,1) PRIMARY KEY,
    ConfessionId    INT NOT NULL,
    ModeratorUserId INT NOT NULL,
    Action          NVARCHAR(20) NOT NULL,     -- APPROVE/REJECT/HIDE/UNHIDE/VIEW
    OldStatus       NVARCHAR(20) NULL,
    NewStatus       NVARCHAR(20) NULL,
    Note            NVARCHAR(300) NULL,
    CreatedAt       DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT FK_NhatKy_Conf FOREIGN KEY (ConfessionId) REFERENCES BaiConfession(Id),
    CONSTRAINT FK_NhatKy_User FOREIGN KEY (ModeratorUserId) REFERENCES NguoiDung(Id)
);
GO

/* ---- FIX #4: chặn chuyển trạng thái confession sai --------------------
   HIDDEN chỉ được đến từ APPROVED; không quay lại PENDING sau khi đã xử lý. */
CREATE TRIGGER trg_BaiConfession_ChanTrangThai ON BaiConfession
AFTER UPDATE AS
BEGIN
    SET NOCOUNT ON;
    IF EXISTS (
        SELECT 1
        FROM inserted i JOIN deleted d ON i.Id = d.Id
        WHERE i.Status <> d.Status
          AND (
                (i.Status = 'HIDDEN'  AND d.Status <> 'APPROVED')      -- HIDDEN chỉ từ APPROVED
             OR (i.Status = 'PENDING' AND d.Status <> 'PENDING')        -- không quay về PENDING
          )
    )
    BEGIN
        ROLLBACK TRANSACTION;
        THROW 50001, N'Chuyen trang thai confession khong hop le (HIDDEN chi tu APPROVED).', 1;
    END
END
GO

/* =====================================================================
   3. HỌC TẬP  (FIX #5: MonHoc = môn, LopHocPhan = lớp học phần)
   ===================================================================== */

CREATE TABLE MonHoc (
    Id          INT IDENTITY(1,1) PRIMARY KEY,
    Code        NVARCHAR(20)  NOT NULL UNIQUE,
    Name        NVARCHAR(150) NOT NULL,
    Description NVARCHAR(MAX) NULL,
    Credits     INT NULL
);

-- Chương của môn: mang WeightPercent phục vụ phân bổ đề (FIX #9)
CREATE TABLE ChuongMonHoc (
    Id            INT IDENTITY(1,1) PRIMARY KEY,
    SubjectId     INT NOT NULL,
    ChapterNo     INT NOT NULL,
    Title         NVARCHAR(200) NOT NULL,
    WeightPercent DECIMAL(5,2) NULL,        -- trọng số theo chương (0-100)
    CONSTRAINT FK_Chuong_MonHoc FOREIGN KEY (SubjectId) REFERENCES MonHoc(Id) ON DELETE CASCADE,
    CONSTRAINT UQ_Chuong UNIQUE (SubjectId, ChapterNo),
    CONSTRAINT CK_Chuong_Weight CHECK (WeightPercent IS NULL OR (WeightPercent >= 0 AND WeightPercent <= 100))
);

-- Lớp học phần = MonHoc + GiangVien + Học kỳ
CREATE TABLE LopHocPhan (
    Id         INT IDENTITY(1,1) PRIMARY KEY,
    SubjectId  INT NOT NULL,
    LecturerId INT NOT NULL,               -- trỏ GiangVien.UserId
    CourseCode NVARCHAR(30) NOT NULL UNIQUE,
    Semester   NVARCHAR(20) NULL,
    Year       INT NULL,
    CONSTRAINT FK_Lop_MonHoc    FOREIGN KEY (SubjectId)  REFERENCES MonHoc(Id),
    CONSTRAINT FK_Lop_GiangVien FOREIGN KEY (LecturerId) REFERENCES GiangVien(UserId)
);

CREATE TABLE DangKyHocPhan (
    Id             INT IDENTITY(1,1) PRIMARY KEY,
    StudentUserId  INT NOT NULL,
    CourseId       INT NOT NULL,
    EnrolledAt     DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT FK_DangKy_SinhVien FOREIGN KEY (StudentUserId) REFERENCES SinhVien(UserId),
    CONSTRAINT FK_DangKy_Lop      FOREIGN KEY (CourseId) REFERENCES LopHocPhan(Id) ON DELETE CASCADE,
    CONSTRAINT UQ_DangKy UNIQUE (StudentUserId, CourseId)
);

-- Tài liệu: cờ IsFree / IsSellable + Price (FIX #6, #7)
CREATE TABLE TaiLieu (
    Id          INT IDENTITY(1,1) PRIMARY KEY,
    CourseId    INT NOT NULL,
    OwnerUserId INT NOT NULL,              -- giảng viên upload
    Type        NVARCHAR(20) NOT NULL,     -- TEXTBOOK/LESSON_PLAN/SLIDE/OTHER
    Title       NVARCHAR(200) NOT NULL,
    Description NVARCHAR(MAX) NULL,
    IsFree      BIT NOT NULL DEFAULT 0,
    IsSellable  BIT NOT NULL DEFAULT 0,
    Price       DECIMAL(18,2) NULL,        -- VND
    Status      NVARCHAR(20) NOT NULL DEFAULT 'DRAFT',   -- DRAFT/PUBLISHED
    CreatedAt   DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT FK_TaiLieu_Lop   FOREIGN KEY (CourseId) REFERENCES LopHocPhan(Id),
    CONSTRAINT FK_TaiLieu_Owner FOREIGN KEY (OwnerUserId) REFERENCES NguoiDung(Id),
    CONSTRAINT CK_TaiLieu_Type  CHECK (Type IN ('TEXTBOOK','LESSON_PLAN','SLIDE','OTHER')),
    CONSTRAINT CK_TaiLieu_Price CHECK (IsSellable = 0 OR Price IS NOT NULL)
);

CREATE TABLE PhienBanTaiLieu (
    Id         INT IDENTITY(1,1) PRIMARY KEY,
    MaterialId INT NOT NULL,
    VersionNo  INT NOT NULL,
    FilePath   NVARCHAR(500) NOT NULL,
    FileSize   BIGINT NULL,
    MimeType   NVARCHAR(100) NULL,
    PageCount  INT NULL,
    UploadedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT FK_PhienBan_TaiLieu FOREIGN KEY (MaterialId) REFERENCES TaiLieu(Id) ON DELETE CASCADE,
    CONSTRAINT UQ_PhienBan UNIQUE (MaterialId, VersionNo)
);

-- Đề cương gắn với MonHoc (dùng chung mọi lớp của môn)
CREATE TABLE DeCuong (
    Id        INT IDENTITY(1,1) PRIMARY KEY,
    SubjectId INT NOT NULL,
    Title     NVARCHAR(200) NOT NULL,
    Content   NVARCHAR(MAX) NULL,
    CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT FK_DeCuong_MonHoc FOREIGN KEY (SubjectId) REFERENCES MonHoc(Id) ON DELETE CASCADE
);

CREATE TABLE BuoiHoc (
    Id            INT IDENTITY(1,1) PRIMARY KEY,
    CourseId      INT NOT NULL,
    LessonNo      INT NOT NULL,
    Title         NVARCHAR(200) NOT NULL,
    Content       NVARCHAR(MAX) NULL,
    ScheduledDate DATE NULL,
    CONSTRAINT FK_BuoiHoc_Lop FOREIGN KEY (CourseId) REFERENCES LopHocPhan(Id) ON DELETE CASCADE
);
GO

/* =====================================================================
   4. MUA BÁN  (FIX #6: SanPham -> TaiLieu ; FIX #7: QuyenTruyCapTaiLieu)
   ===================================================================== */

CREATE TABLE SanPham (
    Id         INT IDENTITY(1,1) PRIMARY KEY,
    MaterialId INT NOT NULL UNIQUE,        -- 1-1: sản phẩm là 1 tài liệu bán được
    Name       NVARCHAR(200) NOT NULL,
    Price      DECIMAL(18,2) NOT NULL,     -- VND
    IsActive   BIT NOT NULL DEFAULT 1,
    CreatedAt  DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT FK_SanPham_TaiLieu FOREIGN KEY (MaterialId) REFERENCES TaiLieu(Id)
);

CREATE TABLE DonHang (
    Id          INT IDENTITY(1,1) PRIMARY KEY,
    UserId      INT NOT NULL,              -- người mua
    Status      NVARCHAR(20) NOT NULL DEFAULT 'PENDING',  -- PENDING/PAID/CANCELLED/FAILED
    TotalAmount DECIMAL(18,2) NOT NULL DEFAULT 0,
    CreatedAt   DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    PaidAt      DATETIME2 NULL,
    CONSTRAINT FK_DonHang_User FOREIGN KEY (UserId) REFERENCES NguoiDung(Id),
    CONSTRAINT CK_DonHang_Status CHECK (Status IN ('PENDING','PAID','CANCELLED','FAILED'))
);

CREATE TABLE ChiTietDonHang (
    Id        INT IDENTITY(1,1) PRIMARY KEY,
    OrderId   INT NOT NULL,
    ProductId INT NOT NULL,                -- FIX #6: item -> SanPham (không phải TaiLieu)
    UnitPrice DECIMAL(18,2) NOT NULL,
    Quantity  INT NOT NULL DEFAULT 1,
    CONSTRAINT FK_ChiTiet_DonHang FOREIGN KEY (OrderId)   REFERENCES DonHang(Id) ON DELETE CASCADE,
    CONSTRAINT FK_ChiTiet_SanPham FOREIGN KEY (ProductId) REFERENCES SanPham(Id)
);

CREATE TABLE ThanhToan (
    Id             INT IDENTITY(1,1) PRIMARY KEY,
    OrderId        INT NOT NULL,
    Provider       NVARCHAR(50) NOT NULL,       -- VNPay/Momo...
    ProviderTxnId  NVARCHAR(100) NULL,
    Amount         DECIMAL(18,2) NOT NULL,
    Status         NVARCHAR(20) NOT NULL DEFAULT 'PENDING', -- PENDING/SUCCESS/FAILED
    RawWebhookPayload NVARCHAR(MAX) NULL,        -- lưu vết webhook để đối soát
    CreatedAt      DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    ConfirmedAt    DATETIME2 NULL,
    CONSTRAINT FK_ThanhToan_DonHang FOREIGN KEY (OrderId) REFERENCES DonHang(Id) ON DELETE CASCADE,
    CONSTRAINT CK_ThanhToan_Status CHECK (Status IN ('PENDING','SUCCESS','FAILED'))
);

-- FIX #7: NGUỒN QUYỀN DUY NHẤT cho tài liệu đã mua/được cấp
CREATE TABLE QuyenTruyCapTaiLieu (
    Id         INT IDENTITY(1,1) PRIMARY KEY,
    UserId     INT NOT NULL,
    MaterialId INT NOT NULL,
    GrantedVia NVARCHAR(20) NOT NULL,       -- PURCHASE/ADMIN/FREE
    OrderId    INT NULL,
    GrantedAt  DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    ExpiresAt  DATETIME2 NULL,
    CONSTRAINT FK_QTC_User     FOREIGN KEY (UserId)     REFERENCES NguoiDung(Id),
    CONSTRAINT FK_QTC_TaiLieu  FOREIGN KEY (MaterialId) REFERENCES TaiLieu(Id),
    CONSTRAINT FK_QTC_DonHang  FOREIGN KEY (OrderId)    REFERENCES DonHang(Id),
    CONSTRAINT UQ_QTC UNIQUE (UserId, MaterialId)
);
GO

/* =====================================================================
   5. AI & THI CỬ
   ===================================================================== */

CREATE TABLE TaiLieuKienThuc (
    Id              INT IDENTITY(1,1) PRIMARY KEY,
    MaterialId      INT NULL,               -- nguồn (giáo trình/giáo án)
    SubjectId       INT NOT NULL,
    Title           NVARCHAR(200) NOT NULL,
    ProcessedStatus NVARCHAR(20) NOT NULL DEFAULT 'PENDING', -- PENDING/DONE/FAILED
    CreatedAt       DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT FK_TLKT_TaiLieu FOREIGN KEY (MaterialId) REFERENCES TaiLieu(Id),
    CONSTRAINT FK_TLKT_MonHoc  FOREIGN KEY (SubjectId)  REFERENCES MonHoc(Id)
);

CREATE TABLE DoanKienThuc (
    Id                  INT IDENTITY(1,1) PRIMARY KEY,
    KnowledgeDocumentId INT NOT NULL,
    SubjectChapterId    INT NULL,           -- chunk thuộc chương nào
    ChunkIndex          INT NOT NULL,
    Content             NVARCHAR(MAX) NOT NULL,
    Embedding           VARBINARY(MAX) NULL, -- SQL Server 2025: có thể đổi sang kiểu VECTOR
    SourceRef           NVARCHAR(200) NULL,  -- vd "Chương 4, mục 4.2"
    CreatedAt           DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT FK_Doan_TLKT   FOREIGN KEY (KnowledgeDocumentId) REFERENCES TaiLieuKienThuc(Id) ON DELETE CASCADE,
    CONSTRAINT FK_Doan_Chuong FOREIGN KEY (SubjectChapterId)    REFERENCES ChuongMonHoc(Id)
);

-- Ngân hàng câu hỏi (FIX #10: validate cấp câu hỏi ở đây, KHÔNG check tỷ lệ 60/20/20)
CREATE TABLE NganHangCauHoi (
    Id                    INT IDENTITY(1,1) PRIMARY KEY,
    SubjectId             INT NOT NULL,
    SubjectChapterId      INT NULL,
    QuestionType          NVARCHAR(20) NOT NULL,   -- THEORY/APPLICATION/PRACTICAL
    Difficulty            NVARCHAR(10) NOT NULL DEFAULT 'MEDIUM', -- EASY/MEDIUM/HARD (FIX #11)
    Content               NVARCHAR(MAX) NOT NULL,
    Explanation           NVARCHAR(MAX) NULL,
    SourceKnowledgeChunkId INT NULL,               -- nguồn kiến thức (chống bịa)
    Status                NVARCHAR(20) NOT NULL DEFAULT 'AI_GENERATED', -- AI_GENERATED/REVIEWED/APPROVED/REJECTED
    CreatedByUserId       INT NULL,
    ReviewedByUserId      INT NULL,                -- FIX #2: giảng viên duyệt câu hỏi AI
    CreatedAt             DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT FK_NH_MonHoc   FOREIGN KEY (SubjectId) REFERENCES MonHoc(Id),
    CONSTRAINT FK_NH_Chuong   FOREIGN KEY (SubjectChapterId) REFERENCES ChuongMonHoc(Id),
    CONSTRAINT FK_NH_Doan     FOREIGN KEY (SourceKnowledgeChunkId) REFERENCES DoanKienThuc(Id),
    CONSTRAINT FK_NH_Creator  FOREIGN KEY (CreatedByUserId) REFERENCES NguoiDung(Id),
    CONSTRAINT FK_NH_Reviewer FOREIGN KEY (ReviewedByUserId) REFERENCES NguoiDung(Id),
    CONSTRAINT CK_NH_Type CHECK (QuestionType IN ('THEORY','APPLICATION','PRACTICAL')),
    CONSTRAINT CK_NH_Diff CHECK (Difficulty IN ('EASY','MEDIUM','HARD')),
    CONSTRAINT CK_NH_Status CHECK (Status IN ('AI_GENERATED','REVIEWED','APPROVED','REJECTED'))
);

CREATE TABLE DapAn (
    Id          INT IDENTITY(1,1) PRIMARY KEY,
    QuestionId  INT NOT NULL,
    OptionLabel NVARCHAR(2) NOT NULL,       -- A/B/C/D
    Content     NVARCHAR(MAX) NOT NULL,
    IsCorrect   BIT NOT NULL DEFAULT 0,
    CONSTRAINT FK_DapAn_CauHoi FOREIGN KEY (QuestionId) REFERENCES NganHangCauHoi(Id) ON DELETE CASCADE,
    CONSTRAINT UQ_DapAn_Label UNIQUE (QuestionId, OptionLabel)
);

-- FIX #10: mỗi câu chỉ được tối đa 1 đáp án đúng
CREATE UNIQUE INDEX UX_DapAn_MotDapAnDung
    ON DapAn(QuestionId)
    WHERE IsCorrect = 1;
GO

-- Đề thi: lưu sẵn hạn ngạch 60/20/20 ở CẤP ĐỀ (FIX #9, #10)
CREATE TABLE DeThi (
    Id               INT IDENTITY(1,1) PRIMARY KEY,
    CreatedByUserId  INT NOT NULL,
    SubjectId        INT NOT NULL,
    ScopeType        NVARCHAR(20) NOT NULL,  -- ALL/CHAPTER_RANGE/SYLLABUS
    ScopeConfig      NVARCHAR(MAX) NULL,     -- JSON mô tả phạm vi
    TotalQuestions   INT NOT NULL,
    DurationMinutes  INT NULL,
    TheoryCount      INT NOT NULL,
    ApplicationCount INT NOT NULL,
    PracticalCount   INT NOT NULL,
    CreatedAt        DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT FK_DeThi_User   FOREIGN KEY (CreatedByUserId) REFERENCES NguoiDung(Id),
    CONSTRAINT FK_DeThi_MonHoc FOREIGN KEY (SubjectId) REFERENCES MonHoc(Id),
    CONSTRAINT CK_DeThi_Sum CHECK (TheoryCount + ApplicationCount + PracticalCount = TotalQuestions)
);

CREATE TABLE CauHoiDeThi (
    Id         INT IDENTITY(1,1) PRIMARY KEY,
    ExamId     INT NOT NULL,
    QuestionId INT NOT NULL,
    OrderNo    INT NOT NULL,
    CONSTRAINT FK_CHDT_DeThi  FOREIGN KEY (ExamId) REFERENCES DeThi(Id) ON DELETE CASCADE,
    CONSTRAINT FK_CHDT_CauHoi FOREIGN KEY (QuestionId) REFERENCES NganHangCauHoi(Id),
    CONSTRAINT UQ_CHDT UNIQUE (ExamId, QuestionId)
);

CREATE TABLE LuotLamBai (
    Id            INT IDENTITY(1,1) PRIMARY KEY,
    ExamId        INT NOT NULL,
    StudentUserId INT NOT NULL,
    StartedAt     DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    SubmittedAt   DATETIME2 NULL,
    Score         DECIMAL(5,2) NULL,
    CorrectCount  INT NULL,
    WrongCount    INT NULL,
    Status        NVARCHAR(20) NOT NULL DEFAULT 'IN_PROGRESS', -- IN_PROGRESS/SUBMITTED/GRADED
    CONSTRAINT FK_LuotLam_DeThi FOREIGN KEY (ExamId) REFERENCES DeThi(Id),
    CONSTRAINT FK_LuotLam_User  FOREIGN KEY (StudentUserId) REFERENCES NguoiDung(Id),
    CONSTRAINT CK_LuotLam_Status CHECK (Status IN ('IN_PROGRESS','SUBMITTED','GRADED'))
);

CREATE TABLE CauTraLoi (
    Id               INT IDENTITY(1,1) PRIMARY KEY,
    AttemptId        INT NOT NULL,
    ExamQuestionId   INT NOT NULL,
    SelectedOptionId INT NULL,
    IsCorrect        BIT NULL,
    AnsweredAt       DATETIME2 NULL,
    CONSTRAINT FK_TraLoi_LuotLam FOREIGN KEY (AttemptId) REFERENCES LuotLamBai(Id) ON DELETE CASCADE,
    CONSTRAINT FK_TraLoi_CHDT    FOREIGN KEY (ExamQuestionId) REFERENCES CauHoiDeThi(Id),
    CONSTRAINT FK_TraLoi_DapAn   FOREIGN KEY (SelectedOptionId) REFERENCES DapAn(Id),
    CONSTRAINT UQ_TraLoi UNIQUE (AttemptId, ExamQuestionId)
);
GO

/* =====================================================================
   6. HÀM CẤP QUYỀN HỢP NHẤT  (FIX #7)
   access = admin OR chủ sở hữu OR miễn phí OR đã có quyền còn hạn
   ===================================================================== */
CREATE FUNCTION dbo.fn_KiemTraQuyenTruyCap (@UserId INT, @MaterialId INT)
RETURNS BIT
AS
BEGIN
    DECLARE @ok BIT = 0;

    IF EXISTS (SELECT 1 FROM NguoiDung_VaiTro ur JOIN VaiTro r ON ur.RoleId = r.Id
               WHERE ur.UserId = @UserId AND r.Code = 'ADMIN')
        SET @ok = 1;
    ELSE IF EXISTS (SELECT 1 FROM TaiLieu m
               WHERE m.Id = @MaterialId AND (m.OwnerUserId = @UserId OR m.IsFree = 1))
        SET @ok = 1;
    ELSE IF EXISTS (SELECT 1 FROM QuyenTruyCapTaiLieu ma
               WHERE ma.UserId = @UserId AND ma.MaterialId = @MaterialId
                 AND (ma.ExpiresAt IS NULL OR ma.ExpiresAt > SYSUTCDATETIME()))
        SET @ok = 1;

    RETURN @ok;
END
GO

/* =====================================================================
   7. SEED RBAC ĐÃ SỬA  (FIX #1, #2, #3)
   ===================================================================== */

INSERT INTO VaiTro (Code, Name) VALUES
 (N'ADMIN', N'Quản trị viên'),
 (N'LECTURER', N'Giảng viên'),
 (N'STUDENT', N'Sinh viên');

INSERT INTO Quyen (Code, Name) VALUES
 (N'CONFESSION_VIEW',            N'Xem confession'),
 (N'CONFESSION_POST',            N'Đăng confession'),
 (N'CONFESSION_MODERATE',        N'Duyệt/ẩn confession'),
 (N'MATERIAL_UPLOAD',            N'Đăng giáo trình/giáo án/đề cương'),
 (N'MATERIAL_DOWNLOAD_OWN',      N'Tải tài liệu mình sở hữu'),      -- FIX #1
 (N'MATERIAL_BUY',               N'Mua tài liệu'),
 (N'MATERIAL_DOWNLOAD_PURCHASED',N'Tải tài liệu đã mua'),           -- FIX #1
 (N'EXAM_AI_CREATE',             N'Tạo đề thi AI'),                 -- FIX #2
 (N'QUESTION_REVIEW',            N'Duyệt câu hỏi AI vào ngân hàng'),
 (N'USER_MANAGE',                N'Quản lý người dùng/phân quyền');

-- ADMIN: toàn quyền (không gồm MATERIAL_BUY - admin bypass, FIX #3)
INSERT INTO VaiTro_Quyen (RoleId, PermissionId)
SELECT r.Id, p.Id FROM VaiTro r, Quyen p
WHERE r.Code = 'ADMIN' AND p.Code <> 'MATERIAL_BUY';

-- LECTURER
INSERT INTO VaiTro_Quyen (RoleId, PermissionId)
SELECT r.Id, p.Id FROM VaiTro r, Quyen p
WHERE r.Code = 'LECTURER'
  AND p.Code IN ('CONFESSION_VIEW','CONFESSION_POST','MATERIAL_UPLOAD',
                 'MATERIAL_DOWNLOAD_OWN','EXAM_AI_CREATE','QUESTION_REVIEW');

-- STUDENT
INSERT INTO VaiTro_Quyen (RoleId, PermissionId)
SELECT r.Id, p.Id FROM VaiTro r, Quyen p
WHERE r.Code = 'STUDENT'
  AND p.Code IN ('CONFESSION_VIEW','CONFESSION_POST','MATERIAL_BUY',
                 'MATERIAL_DOWNLOAD_PURCHASED','EXAM_AI_CREATE');
GO

/* ============================ HẾT ============================ */
