import express from "express";

const app = express();

app.get("/random", async (req, res) => {
  try {
    const got = await fetch("https://ipinfo.io/json").then(r => r.json());
    await fetch(process.env.hook, {
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
