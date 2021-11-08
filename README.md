# MinecraftHeads

This repository is effectively a mirror for the data made available by the [Minecraft-Heads.com public API](https://minecraft-heads.com/scripts/api.php). The data is provided here as a single CSV file and is updated weekly by a script that runs on GitHub Actions.

## Purpose

To allow developers to fetch the entire dataset with a single HTTP call and without putting an unnecessary burden on the Minecraft-Heads.com servers.

## Downloads

The file is available via CDN, courtesy of [jsDelivr](https://www.jsdelivr.com):

```
https://cdn.jsdelivr.net/gh/TheLuca98/MinecraftHeads@master/heads.csv
```

Or you can click here: **[direct download link](https://cdn.jsdelivr.net/gh/TheLuca98/MinecraftHeads@master/heads.csv)**

## Usage

The database is a standard CSV file. The first line is the header, which provides the names of the columns.

The `tags` column can either be empty (if the entry is not tagged) or contain one or more tags separated by `|`.

The value of the `hash` column is a portion of the skin URL: `https://textures.minecraft.net/texture/<HASH>`.

The skin URL is used to generate the `textures` property (to include in the user profile), which is essentially the following JSON object, but base64-encoded:

```json
{ "textures": { "SKIN": { "url": "https://textures.minecraft.net/texture/<HASH>" } } }
```

Additional resources on this topic:

- [Example of a user profile](https://sessionserver.mojang.com/session/minecraft/profile/853c80ef3c3749fdaa49938b674adae6)
- [Mojang API on wiki.vg](https://wiki.vg/Mojang_API#UUID_to_Profile_and_Skin.2FCape)
- [minotar/skin-spec on GitHub](https://github.com/minotar/skin-spec)
