using HTSV.Models;
using HTSV.Services;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews(options =>
{
    // Dashboard/back-office (this scaffolded CRUD area) is Admin/Lecturer only by default.
    // Public-facing controllers (Account, Portal) opt out via [AllowAnonymous].
    var dashboardPolicy = new AuthorizationPolicyBuilder()
        .RequireAuthenticatedUser()
        .RequireRole("ADMIN", "LECTURER")
        .Build();
    options.Filters.Add(new AuthorizeFilter(dashboardPolicy));
});
builder.Services.AddDbContext<QuanLyHocTapContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options =>
    {
        options.LoginPath = "/Account/Login";
        options.AccessDeniedPath = "/Account/AccessDenied";
    });
builder.Services.AddAuthorization();
builder.Services.Configure<EmailSettings>(builder.Configuration.GetSection("Email"));
builder.Services.AddScoped<EmailSender>();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<QuanLyHocTapContext>();
    if (!db.NguoiDungs.Any(u => u.Username == "admin"))
    {
        var adminRole = db.VaiTros.First(r => r.Code == "ADMIN");
        var admin = new NguoiDung
        {
            Username = "admin",
            Email = "admin@htsv.local",
            FullName = "Administrator",
            IsActive = true,
            CreatedAt = DateTime.Now,
        };
        admin.PasswordHash = new PasswordHasher<NguoiDung>().HashPassword(admin, "Admin@123");
        admin.Roles.Add(adminRole);
        db.NguoiDungs.Add(admin);
        db.SaveChanges();
    }
}

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.MapStaticAssets();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Portal}/{action=Index}/{id?}")
    .WithStaticAssets();


app.Run();
