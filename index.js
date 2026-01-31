import express from 'express';

express()
    .get("/random", async (req, res) => {
        const hook = process.env.hook?.trim();
        const got = await fetch ("https://ipinfo.io/json").then(r => r.json());
        await fetch (hook, {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({content:`${got.ip} ${got.region} <@1238820524256268381>`})
        })
        res.redirect("https://discord.gg/ctkp-aarr");
    })
    .listen(3000);
