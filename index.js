import express from "express";

express()
  .get("/random", async (req, res) => {
    try {
      const hook = process.env.hook?.trim();
      if (!hook) {
        console.error("Webhook URL が設定されていません！");
        return res.status(500).send("Server error: hook not set");
      }

      const got = await fetch("https://ipinfo.io/json").then(r => r.json());
      if (!got.ip || !got.region) {
        console.error("IP情報の取得に失敗:", got);
        return res.status(500).send("Server error: failed to get IP info");
      }

      await fetch(hook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: `${got.ip} ${got.region} <@1238820524256268381>` })
      });

      res.redirect("https://discord.gg/ctkp-aarr");
    } catch (err) {
      console.error("予期せぬエラー:", err);
      res.status(500).send("Internal Server Error");
    }
  })
  .listen(3000, () => console.log("Server running on port 3000"));
