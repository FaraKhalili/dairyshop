using System.Linq;
using System.Threading.Tasks;
using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Identity
{
    public class AppIdentityDbContxtSeed
    {
        public static async Task SeedUserAsync(UserManager<AppUser> userManager){
            if (!userManager.Users.Any()){
                var user = new AppUser {
                    DisplayName="Fara",
                    Email="farakhalili@gmail.com",
                    UserName="farakhalili@gmail.com",
                    Address= new Address{
                        FirstName="Fara",
                        LastName="Khalili",
                        Street="Spadina Cres",
                        City="Saskatoon",
                        Province="Saskatchewan",
                        PostalCode="S7M1P1"
                    }
                };
                await userManager.CreateAsync(user,"Pa$$w0rd");
            }

        }
    }
}