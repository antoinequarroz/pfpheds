const fs = require('fs');
const axios = require('axios');

// Remplace ces valeurs par celles de ton projet Supabase
const SUPABASE_URL = 'https://ydnzqswjxksjnmqtepti.supabase.co'; // <-- À MODIFIER
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlkbnpxc3dqeGtzam5tcXRlcHRpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MzI0ODc1OCwiZXhwIjoyMDY4ODI0NzU4fQ.nS0dc7cOYKf_eQ9E-ys18cVwDn-pHza08UzuKTjgTzA'; // <-- À MODIFIER

const users = JSON.parse(fs.readFileSync('users.json', 'utf-8')).users;

async function importUsers() {
  for (const user of users) {
    const email = user.email;
    if (!email) continue;
    try {
      await axios.post(
        `${SUPABASE_URL}/auth/v1/admin/users`,
        {
          email: email,
          email_confirm: false, // ou true si tu veux marquer comme confirmé
          password: 'ChangeMe123!' // mot de passe temporaire à changer ensuite
        },
        {
          headers: {
            apiKey: SERVICE_ROLE_KEY,
            Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );
      console.log(`✅ Utilisateur importé : ${email}`);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.msg) {
        console.error(`❌ Erreur pour ${email}: ${err.response.data.msg}`);
      } else {
        console.error(`❌ Erreur pour ${email}:`, err.message);
      }
    }
  }
}

importUsers();
