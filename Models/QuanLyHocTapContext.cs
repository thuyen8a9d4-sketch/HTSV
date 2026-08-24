using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace HTSV.Models;

public partial class QuanLyHocTapContext : DbContext
{
    public QuanLyHocTapContext()
    {
    }

    public QuanLyHocTapContext(DbContextOptions<QuanLyHocTapContext> options)
        : base(options)
    {
    }

    public virtual DbSet<BaiConfession> BaiConfessions { get; set; }

    public virtual DbSet<BaoCao> BaoCaos { get; set; }

    public virtual DbSet<BinhLuan> BinhLuans { get; set; }

    public virtual DbSet<BuoiHoc> BuoiHocs { get; set; }

    public virtual DbSet<CauHoiDeThi> CauHoiDeThis { get; set; }

    public virtual DbSet<CauTraLoi> CauTraLois { get; set; }

    public virtual DbSet<ChiTietDonHang> ChiTietDonHangs { get; set; }

    public virtual DbSet<ChuongMonHoc> ChuongMonHocs { get; set; }

    public virtual DbSet<DangKyHocPhan> DangKyHocPhans { get; set; }

    public virtual DbSet<DanhMucConfession> DanhMucConfessions { get; set; }

    public virtual DbSet<DapAn> DapAns { get; set; }

    public virtual DbSet<DeCuong> DeCuongs { get; set; }

    public virtual DbSet<DeThi> DeThis { get; set; }

    public virtual DbSet<DoanKienThuc> DoanKienThucs { get; set; }

    public virtual DbSet<DonHang> DonHangs { get; set; }

    public virtual DbSet<GiangVien> GiangViens { get; set; }

    public virtual DbSet<LopHocPhan> LopHocPhans { get; set; }

    public virtual DbSet<LuotLamBai> LuotLamBais { get; set; }

    public virtual DbSet<LuotThich> LuotThiches { get; set; }

    public virtual DbSet<MonHoc> MonHocs { get; set; }

    public virtual DbSet<NganHangCauHoi> NganHangCauHois { get; set; }

    public virtual DbSet<NguoiDung> NguoiDungs { get; set; }

    public virtual DbSet<NhatKyKiemDuyet> NhatKyKiemDuyets { get; set; }

    public virtual DbSet<PhienBanTaiLieu> PhienBanTaiLieus { get; set; }

    public virtual DbSet<Quyen> Quyens { get; set; }

    public virtual DbSet<QuyenTruyCapTaiLieu> QuyenTruyCapTaiLieus { get; set; }

    public virtual DbSet<SanPham> SanPhams { get; set; }

    public virtual DbSet<SinhVien> SinhViens { get; set; }

    public virtual DbSet<TaiLieu> TaiLieus { get; set; }

    public virtual DbSet<TaiLieuKienThuc> TaiLieuKienThucs { get; set; }

    public virtual DbSet<ThanhToan> ThanhToans { get; set; }

    public virtual DbSet<VaiTro> VaiTros { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<BaiConfession>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__BaiConfe__3214EC07AF6E1DD0");

            entity.ToTable("BaiConfession", tb => tb.HasTrigger("trg_BaiConfession_ChanTrangThai"));

            entity.Property(e => e.CreatedAt).HasDefaultValueSql("(sysutcdatetime())");
            entity.Property(e => e.RejectReason).HasMaxLength(300);
            entity.Property(e => e.Status)
                .HasMaxLength(20)
                .HasDefaultValue("PENDING");

            entity.HasOne(d => d.AuthorUser).WithMany(p => p.BaiConfessions)
                .HasForeignKey(d => d.AuthorUserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Conf_Author");

            entity.HasOne(d => d.Category).WithMany(p => p.BaiConfessions)
                .HasForeignKey(d => d.CategoryId)
                .HasConstraintName("FK_Conf_Category");
        });

        modelBuilder.Entity<BaoCao>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__BaoCao__3214EC0770D643DD");

            entity.ToTable("BaoCao");

            entity.Property(e => e.CreatedAt).HasDefaultValueSql("(sysutcdatetime())");
            entity.Property(e => e.Reason).HasMaxLength(300);
            entity.Property(e => e.Status)
                .HasMaxLength(20)
                .HasDefaultValue("OPEN");

            entity.HasOne(d => d.Comment).WithMany(p => p.BaoCaos)
                .HasForeignKey(d => d.CommentId)
                .HasConstraintName("FK_BaoCao_Comment");

            entity.HasOne(d => d.Confession).WithMany(p => p.BaoCaos)
                .HasForeignKey(d => d.ConfessionId)
                .HasConstraintName("FK_BaoCao_Conf");

            entity.HasOne(d => d.ReporterUser).WithMany(p => p.BaoCaos)
                .HasForeignKey(d => d.ReporterUserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_BaoCao_User");
        });

        modelBuilder.Entity<BinhLuan>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__BinhLuan__3214EC0706EB32DB");

            entity.ToTable("BinhLuan");

            entity.Property(e => e.CreatedAt).HasDefaultValueSql("(sysutcdatetime())");

            entity.HasOne(d => d.AuthorUser).WithMany(p => p.BinhLuans)
                .HasForeignKey(d => d.AuthorUserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_BinhLuan_User");

            entity.HasOne(d => d.Confession).WithMany(p => p.BinhLuans)
                .HasForeignKey(d => d.ConfessionId)
                .HasConstraintName("FK_BinhLuan_Conf");
        });

        modelBuilder.Entity<BuoiHoc>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__BuoiHoc__3214EC0787843B6E");

            entity.ToTable("BuoiHoc");

            entity.Property(e => e.Title).HasMaxLength(200);

            entity.HasOne(d => d.Course).WithMany(p => p.BuoiHocs)
                .HasForeignKey(d => d.CourseId)
                .HasConstraintName("FK_BuoiHoc_Lop");
        });

        modelBuilder.Entity<CauHoiDeThi>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__CauHoiDe__3214EC0795D08673");

            entity.ToTable("CauHoiDeThi");

            entity.HasIndex(e => new { e.ExamId, e.QuestionId }, "UQ_CHDT").IsUnique();

            entity.HasOne(d => d.Exam).WithMany(p => p.CauHoiDeThis)
                .HasForeignKey(d => d.ExamId)
                .HasConstraintName("FK_CHDT_DeThi");

            entity.HasOne(d => d.Question).WithMany(p => p.CauHoiDeThis)
                .HasForeignKey(d => d.QuestionId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CHDT_CauHoi");
        });

        modelBuilder.Entity<CauTraLoi>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__CauTraLo__3214EC07C0D08276");

            entity.ToTable("CauTraLoi");

            entity.HasIndex(e => new { e.AttemptId, e.ExamQuestionId }, "UQ_TraLoi").IsUnique();

            entity.HasOne(d => d.Attempt).WithMany(p => p.CauTraLois)
                .HasForeignKey(d => d.AttemptId)
                .HasConstraintName("FK_TraLoi_LuotLam");

            entity.HasOne(d => d.ExamQuestion).WithMany(p => p.CauTraLois)
                .HasForeignKey(d => d.ExamQuestionId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TraLoi_CHDT");

            entity.HasOne(d => d.SelectedOption).WithMany(p => p.CauTraLois)
                .HasForeignKey(d => d.SelectedOptionId)
                .HasConstraintName("FK_TraLoi_DapAn");
        });

        modelBuilder.Entity<ChiTietDonHang>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__ChiTietD__3214EC07B25FFC8B");

            entity.ToTable("ChiTietDonHang");

            entity.Property(e => e.Quantity).HasDefaultValue(1);
            entity.Property(e => e.UnitPrice).HasColumnType("decimal(18, 2)");

            entity.HasOne(d => d.Order).WithMany(p => p.ChiTietDonHangs)
                .HasForeignKey(d => d.OrderId)
                .HasConstraintName("FK_ChiTiet_DonHang");

            entity.HasOne(d => d.Product).WithMany(p => p.ChiTietDonHangs)
                .HasForeignKey(d => d.ProductId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ChiTiet_SanPham");
        });

        modelBuilder.Entity<ChuongMonHoc>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__ChuongMo__3214EC075451223F");

            entity.ToTable("ChuongMonHoc");

            entity.HasIndex(e => new { e.SubjectId, e.ChapterNo }, "UQ_Chuong").IsUnique();

            entity.Property(e => e.Title).HasMaxLength(200);
            entity.Property(e => e.WeightPercent).HasColumnType("decimal(5, 2)");

            entity.HasOne(d => d.Subject).WithMany(p => p.ChuongMonHocs)
                .HasForeignKey(d => d.SubjectId)
                .HasConstraintName("FK_Chuong_MonHoc");
        });

        modelBuilder.Entity<DangKyHocPhan>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__DangKyHo__3214EC0749AC72B2");

            entity.ToTable("DangKyHocPhan");

            entity.HasIndex(e => new { e.StudentUserId, e.CourseId }, "UQ_DangKy").IsUnique();

            entity.Property(e => e.EnrolledAt).HasDefaultValueSql("(sysutcdatetime())");

            entity.HasOne(d => d.Course).WithMany(p => p.DangKyHocPhans)
                .HasForeignKey(d => d.CourseId)
                .HasConstraintName("FK_DangKy_Lop");

            entity.HasOne(d => d.StudentUser).WithMany(p => p.DangKyHocPhans)
                .HasForeignKey(d => d.StudentUserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DangKy_SinhVien");
        });

        modelBuilder.Entity<DanhMucConfession>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__DanhMucC__3214EC07AD4127B7");

            entity.ToTable("DanhMucConfession");

            entity.HasIndex(e => e.Slug, "UQ__DanhMucC__BC7B5FB693783214").IsUnique();

            entity.Property(e => e.Name).HasMaxLength(100);
            entity.Property(e => e.Slug).HasMaxLength(100);
        });

        modelBuilder.Entity<DapAn>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__DapAn__3214EC0742183101");

            entity.ToTable("DapAn");

            entity.HasIndex(e => new { e.QuestionId, e.OptionLabel }, "UQ_DapAn_Label").IsUnique();

            entity.HasIndex(e => e.QuestionId, "UX_DapAn_MotDapAnDung")
                .IsUnique()
                .HasFilter("([IsCorrect]=(1))");

            entity.Property(e => e.OptionLabel).HasMaxLength(2);

            entity.HasOne(d => d.Question).WithOne(p => p.DapAn)
                .HasForeignKey<DapAn>(d => d.QuestionId)
                .HasConstraintName("FK_DapAn_CauHoi");
        });

        modelBuilder.Entity<DeCuong>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__DeCuong__3214EC076A7AE045");

            entity.ToTable("DeCuong");

            entity.Property(e => e.CreatedAt).HasDefaultValueSql("(sysutcdatetime())");
            entity.Property(e => e.Title).HasMaxLength(200);

            entity.HasOne(d => d.Subject).WithMany(p => p.DeCuongs)
                .HasForeignKey(d => d.SubjectId)
                .HasConstraintName("FK_DeCuong_MonHoc");
        });

        modelBuilder.Entity<DeThi>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__DeThi__3214EC0706209057");

            entity.ToTable("DeThi");

            entity.Property(e => e.CreatedAt).HasDefaultValueSql("(sysutcdatetime())");
            entity.Property(e => e.ScopeType).HasMaxLength(20);

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.DeThis)
                .HasForeignKey(d => d.CreatedByUserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DeThi_User");

            entity.HasOne(d => d.Subject).WithMany(p => p.DeThis)
                .HasForeignKey(d => d.SubjectId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DeThi_MonHoc");
        });

        modelBuilder.Entity<DoanKienThuc>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__DoanKien__3214EC0702232AF8");

            entity.ToTable("DoanKienThuc");

            entity.Property(e => e.CreatedAt).HasDefaultValueSql("(sysutcdatetime())");
            entity.Property(e => e.SourceRef).HasMaxLength(200);

            entity.HasOne(d => d.KnowledgeDocument).WithMany(p => p.DoanKienThucs)
                .HasForeignKey(d => d.KnowledgeDocumentId)
                .HasConstraintName("FK_Doan_TLKT");

            entity.HasOne(d => d.SubjectChapter).WithMany(p => p.DoanKienThucs)
                .HasForeignKey(d => d.SubjectChapterId)
                .HasConstraintName("FK_Doan_Chuong");
        });

        modelBuilder.Entity<DonHang>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__DonHang__3214EC07280A77AD");

            entity.ToTable("DonHang");

            entity.Property(e => e.CreatedAt).HasDefaultValueSql("(sysutcdatetime())");
            entity.Property(e => e.Status)
                .HasMaxLength(20)
                .HasDefaultValue("PENDING");
            entity.Property(e => e.TotalAmount).HasColumnType("decimal(18, 2)");

            entity.HasOne(d => d.User).WithMany(p => p.DonHangs)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DonHang_User");
        });

        modelBuilder.Entity<GiangVien>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__GiangVie__1788CC4CC89890DB");

            entity.ToTable("GiangVien");

            entity.HasIndex(e => e.LecturerCode, "UQ__GiangVie__BB9CDAB360049D5D").IsUnique();

            entity.Property(e => e.UserId).ValueGeneratedNever();
            entity.Property(e => e.Department).HasMaxLength(100);
            entity.Property(e => e.LecturerCode).HasMaxLength(20);
            entity.Property(e => e.Title).HasMaxLength(50);

            entity.HasOne(d => d.User).WithOne(p => p.GiangVien)
                .HasForeignKey<GiangVien>(d => d.UserId)
                .HasConstraintName("FK_GiangVien_NguoiDung");
        });

        modelBuilder.Entity<LopHocPhan>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__LopHocPh__3214EC07C966D89E");

            entity.ToTable("LopHocPhan");

            entity.HasIndex(e => e.CourseCode, "UQ__LopHocPh__FC00E000876FB0B9").IsUnique();

            entity.Property(e => e.CourseCode).HasMaxLength(30);
            entity.Property(e => e.Semester).HasMaxLength(20);

            entity.HasOne(d => d.Lecturer).WithMany(p => p.LopHocPhans)
                .HasForeignKey(d => d.LecturerId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Lop_GiangVien");

            entity.HasOne(d => d.Subject).WithMany(p => p.LopHocPhans)
                .HasForeignKey(d => d.SubjectId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Lop_MonHoc");
        });

        modelBuilder.Entity<LuotLamBai>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__LuotLamB__3214EC07984574F1");

            entity.ToTable("LuotLamBai");

            entity.Property(e => e.Score).HasColumnType("decimal(5, 2)");
            entity.Property(e => e.StartedAt).HasDefaultValueSql("(sysutcdatetime())");
            entity.Property(e => e.Status)
                .HasMaxLength(20)
                .HasDefaultValue("IN_PROGRESS");

            entity.HasOne(d => d.Exam).WithMany(p => p.LuotLamBais)
                .HasForeignKey(d => d.ExamId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_LuotLam_DeThi");

            entity.HasOne(d => d.StudentUser).WithMany(p => p.LuotLamBais)
                .HasForeignKey(d => d.StudentUserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_LuotLam_User");
        });

        modelBuilder.Entity<LuotThich>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__LuotThic__3214EC0729F269C4");

            entity.ToTable("LuotThich");

            entity.HasIndex(e => new { e.ConfessionId, e.UserId, e.Type }, "UQ_LuotThich").IsUnique();

            entity.Property(e => e.CreatedAt).HasDefaultValueSql("(sysutcdatetime())");
            entity.Property(e => e.Type)
                .HasMaxLength(20)
                .HasDefaultValue("LIKE");

            entity.HasOne(d => d.Confession).WithMany(p => p.LuotThiches)
                .HasForeignKey(d => d.ConfessionId)
                .HasConstraintName("FK_LuotThich_Conf");

            entity.HasOne(d => d.User).WithMany(p => p.LuotThiches)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_LuotThich_User");
        });

        modelBuilder.Entity<MonHoc>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__MonHoc__3214EC07BCE2C10B");

            entity.ToTable("MonHoc");

            entity.HasIndex(e => e.Code, "UQ__MonHoc__A25C5AA7F7573777").IsUnique();

            entity.Property(e => e.Code).HasMaxLength(20);
            entity.Property(e => e.Name).HasMaxLength(150);
        });

        modelBuilder.Entity<NganHangCauHoi>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__NganHang__3214EC0766FEC231");

            entity.ToTable("NganHangCauHoi");

            entity.Property(e => e.CreatedAt).HasDefaultValueSql("(sysutcdatetime())");
            entity.Property(e => e.Difficulty)
                .HasMaxLength(10)
                .HasDefaultValue("MEDIUM");
            entity.Property(e => e.QuestionType).HasMaxLength(20);
            entity.Property(e => e.Status)
                .HasMaxLength(20)
                .HasDefaultValue("AI_GENERATED");

            entity.HasOne(d => d.CreatedByUser).WithMany(p => p.NganHangCauHoiCreatedByUsers)
                .HasForeignKey(d => d.CreatedByUserId)
                .HasConstraintName("FK_NH_Creator");

            entity.HasOne(d => d.ReviewedByUser).WithMany(p => p.NganHangCauHoiReviewedByUsers)
                .HasForeignKey(d => d.ReviewedByUserId)
                .HasConstraintName("FK_NH_Reviewer");

            entity.HasOne(d => d.SourceKnowledgeChunk).WithMany(p => p.NganHangCauHois)
                .HasForeignKey(d => d.SourceKnowledgeChunkId)
                .HasConstraintName("FK_NH_Doan");

            entity.HasOne(d => d.SubjectChapter).WithMany(p => p.NganHangCauHois)
                .HasForeignKey(d => d.SubjectChapterId)
                .HasConstraintName("FK_NH_Chuong");

            entity.HasOne(d => d.Subject).WithMany(p => p.NganHangCauHois)
                .HasForeignKey(d => d.SubjectId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_NH_MonHoc");
        });

        modelBuilder.Entity<NguoiDung>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__NguoiDun__3214EC0761574AC7");

            entity.ToTable("NguoiDung");

            entity.HasIndex(e => e.Username, "UQ__NguoiDun__536C85E4C7B3C29A").IsUnique();

            entity.HasIndex(e => e.Email, "UQ__NguoiDun__A9D10534B4C57431").IsUnique();

            entity.Property(e => e.CreatedAt).HasDefaultValueSql("(sysutcdatetime())");
            entity.Property(e => e.Email).HasMaxLength(255);
            entity.Property(e => e.FullName).HasMaxLength(150);
            entity.Property(e => e.IsActive).HasDefaultValue(true);
            entity.Property(e => e.PasswordHash).HasMaxLength(255);
            entity.Property(e => e.Username).HasMaxLength(50);

            entity.HasMany(d => d.Roles).WithMany(p => p.Users)
                .UsingEntity<Dictionary<string, object>>(
                    "NguoiDungVaiTro",
                    r => r.HasOne<VaiTro>().WithMany()
                        .HasForeignKey("RoleId")
                        .HasConstraintName("FK_NDVT_VaiTro"),
                    l => l.HasOne<NguoiDung>().WithMany()
                        .HasForeignKey("UserId")
                        .HasConstraintName("FK_NDVT_NguoiDung"),
                    j =>
                    {
                        j.HasKey("UserId", "RoleId");
                        j.ToTable("NguoiDung_VaiTro");
                    });
        });

        modelBuilder.Entity<NhatKyKiemDuyet>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__NhatKyKi__3214EC0755996FF8");

            entity.ToTable("NhatKyKiemDuyet");

            entity.Property(e => e.Action).HasMaxLength(20);
            entity.Property(e => e.CreatedAt).HasDefaultValueSql("(sysutcdatetime())");
            entity.Property(e => e.NewStatus).HasMaxLength(20);
            entity.Property(e => e.Note).HasMaxLength(300);
            entity.Property(e => e.OldStatus).HasMaxLength(20);

            entity.HasOne(d => d.Confession).WithMany(p => p.NhatKyKiemDuyets)
                .HasForeignKey(d => d.ConfessionId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_NhatKy_Conf");

            entity.HasOne(d => d.ModeratorUser).WithMany(p => p.NhatKyKiemDuyets)
                .HasForeignKey(d => d.ModeratorUserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_NhatKy_User");
        });

        modelBuilder.Entity<PhienBanTaiLieu>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__PhienBan__3214EC07FE12A5B9");

            entity.ToTable("PhienBanTaiLieu");

            entity.HasIndex(e => new { e.MaterialId, e.VersionNo }, "UQ_PhienBan").IsUnique();

            entity.Property(e => e.FilePath).HasMaxLength(500);
            entity.Property(e => e.MimeType).HasMaxLength(100);
            entity.Property(e => e.UploadedAt).HasDefaultValueSql("(sysutcdatetime())");

            entity.HasOne(d => d.Material).WithMany(p => p.PhienBanTaiLieus)
                .HasForeignKey(d => d.MaterialId)
                .HasConstraintName("FK_PhienBan_TaiLieu");
        });

        modelBuilder.Entity<Quyen>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Quyen__3214EC07F00DCC3E");

            entity.ToTable("Quyen");

            entity.HasIndex(e => e.Code, "UQ__Quyen__A25C5AA775305351").IsUnique();

            entity.Property(e => e.Code).HasMaxLength(60);
            entity.Property(e => e.Description).HasMaxLength(300);
            entity.Property(e => e.Name).HasMaxLength(150);
        });

        modelBuilder.Entity<QuyenTruyCapTaiLieu>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__QuyenTru__3214EC07B8C43999");

            entity.ToTable("QuyenTruyCapTaiLieu");

            entity.HasIndex(e => new { e.UserId, e.MaterialId }, "UQ_QTC").IsUnique();

            entity.Property(e => e.GrantedAt).HasDefaultValueSql("(sysutcdatetime())");
            entity.Property(e => e.GrantedVia).HasMaxLength(20);

            entity.HasOne(d => d.Material).WithMany(p => p.QuyenTruyCapTaiLieus)
                .HasForeignKey(d => d.MaterialId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_QTC_TaiLieu");

            entity.HasOne(d => d.Order).WithMany(p => p.QuyenTruyCapTaiLieus)
                .HasForeignKey(d => d.OrderId)
                .HasConstraintName("FK_QTC_DonHang");

            entity.HasOne(d => d.User).WithMany(p => p.QuyenTruyCapTaiLieus)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_QTC_User");
        });

        modelBuilder.Entity<SanPham>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__SanPham__3214EC0746AD71A4");

            entity.ToTable("SanPham");

            entity.HasIndex(e => e.MaterialId, "UQ__SanPham__C50610F6A14C4012").IsUnique();

            entity.Property(e => e.CreatedAt).HasDefaultValueSql("(sysutcdatetime())");
            entity.Property(e => e.IsActive).HasDefaultValue(true);
            entity.Property(e => e.Name).HasMaxLength(200);
            entity.Property(e => e.Price).HasColumnType("decimal(18, 2)");

            entity.HasOne(d => d.Material).WithOne(p => p.SanPham)
                .HasForeignKey<SanPham>(d => d.MaterialId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SanPham_TaiLieu");
        });

        modelBuilder.Entity<SinhVien>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__SinhVien__1788CC4CE6FDBF53");

            entity.ToTable("SinhVien");

            entity.HasIndex(e => e.StudentCode, "UQ__SinhVien__1FC8860414A33AD8").IsUnique();

            entity.Property(e => e.UserId).ValueGeneratedNever();
            entity.Property(e => e.ClassName).HasMaxLength(50);
            entity.Property(e => e.Major).HasMaxLength(100);
            entity.Property(e => e.StudentCode).HasMaxLength(20);

            entity.HasOne(d => d.User).WithOne(p => p.SinhVien)
                .HasForeignKey<SinhVien>(d => d.UserId)
                .HasConstraintName("FK_SinhVien_NguoiDung");
        });

        modelBuilder.Entity<TaiLieu>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__TaiLieu__3214EC0707CE5A26");

            entity.ToTable("TaiLieu");

            entity.Property(e => e.CreatedAt).HasDefaultValueSql("(sysutcdatetime())");
            entity.Property(e => e.Price).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.Status)
                .HasMaxLength(20)
                .HasDefaultValue("DRAFT");
            entity.Property(e => e.Title).HasMaxLength(200);
            entity.Property(e => e.Type).HasMaxLength(20);

            entity.HasOne(d => d.Course).WithMany(p => p.TaiLieus)
                .HasForeignKey(d => d.CourseId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TaiLieu_Lop");

            entity.HasOne(d => d.OwnerUser).WithMany(p => p.TaiLieus)
                .HasForeignKey(d => d.OwnerUserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TaiLieu_Owner");
        });

        modelBuilder.Entity<TaiLieuKienThuc>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__TaiLieuK__3214EC07300A60AE");

            entity.ToTable("TaiLieuKienThuc");

            entity.Property(e => e.CreatedAt).HasDefaultValueSql("(sysutcdatetime())");
            entity.Property(e => e.ProcessedStatus)
                .HasMaxLength(20)
                .HasDefaultValue("PENDING");
            entity.Property(e => e.Title).HasMaxLength(200);

            entity.HasOne(d => d.Material).WithMany(p => p.TaiLieuKienThucs)
                .HasForeignKey(d => d.MaterialId)
                .HasConstraintName("FK_TLKT_TaiLieu");

            entity.HasOne(d => d.Subject).WithMany(p => p.TaiLieuKienThucs)
                .HasForeignKey(d => d.SubjectId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TLKT_MonHoc");
        });

        modelBuilder.Entity<ThanhToan>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__ThanhToa__3214EC0708FFBBCC");

            entity.ToTable("ThanhToan");

            entity.Property(e => e.Amount).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.CreatedAt).HasDefaultValueSql("(sysutcdatetime())");
            entity.Property(e => e.Provider).HasMaxLength(50);
            entity.Property(e => e.ProviderTxnId).HasMaxLength(100);
            entity.Property(e => e.Status)
                .HasMaxLength(20)
                .HasDefaultValue("PENDING");

            entity.HasOne(d => d.Order).WithMany(p => p.ThanhToans)
                .HasForeignKey(d => d.OrderId)
                .HasConstraintName("FK_ThanhToan_DonHang");
        });

        modelBuilder.Entity<VaiTro>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__VaiTro__3214EC07883EB4A2");

            entity.ToTable("VaiTro");

            entity.HasIndex(e => e.Code, "UQ__VaiTro__A25C5AA747A116F7").IsUnique();

            entity.Property(e => e.Code).HasMaxLength(30);
            entity.Property(e => e.Name).HasMaxLength(100);

            entity.HasMany(d => d.Permissions).WithMany(p => p.Roles)
                .UsingEntity<Dictionary<string, object>>(
                    "VaiTroQuyen",
                    r => r.HasOne<Quyen>().WithMany()
                        .HasForeignKey("PermissionId")
                        .HasConstraintName("FK_VTQ_Quyen"),
                    l => l.HasOne<VaiTro>().WithMany()
                        .HasForeignKey("RoleId")
                        .HasConstraintName("FK_VTQ_VaiTro"),
                    j =>
                    {
                        j.HasKey("RoleId", "PermissionId");
                        j.ToTable("VaiTro_Quyen");
                    });
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
