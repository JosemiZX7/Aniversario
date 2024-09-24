// Reemplaza con tu dominio y Client ID de Auth0
const domain = "YOUR_DOMAIN"; // Ejemplo: "tu-dominio.auth0.com"
const clientId = "YOUR_CLIENT_ID"; // Ejemplo: "tu_client_id"

const auth0 = await createAuth0Client({
    domain: domain,
    client_id: clientId,
});

document.getElementById("login-button").addEventListener("click", async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        await auth0.loginWithResourceOwner({ username: email, password });
        window.location.href = 'index.html'; // Redirigir a la página principal
    } catch (error) {
        document.getElementById('error-message').textContent = "Error de inicio de sesión. Verifica tus credenciales.";
    }
});

// Verificar si el usuario está autenticado
async function checkAuth() {
    const isAuthenticated = await auth0.isAuthenticated();
    
    if (isAuthenticated) {
        const user = await auth0.getUser();
        const allowedEmails = ["user1@example.com", "user2@example.com"]; // Reemplaza con los correos de los usuarios permitidos

        if (allowedEmails.includes(user.email)) {
            // Muestra el contenido protegido
            document.getElementById("protected-content").style.display = "block";
            document.getElementById("login-button").style.display = "none";
            document.getElementById("logout-button").style.display = "block";
        } else {
            alert("No tienes acceso a esta página.");
            auth0.logout({ returnTo: window.location.origin });
        }
    } else {
        document.getElementById("login-button").style.display = "block";
    }
}

checkAuth();

// Manejar la desconexión
document.getElementById("logout-button").addEventListener("click", async () => {
    await auth0.logout({ returnTo: window.location.origin });
});
