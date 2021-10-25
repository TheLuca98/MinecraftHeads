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

The database is a standard CSV file. Things to be aware of when parsing:

- The first line is the header and provides the names of the columns.
- The `tags` column might sometimes be empty (some entries are simply not tagged).
- If an entry has multiple tags, they are separated by `|`.

The most important part of the dataset is the `value` column, which allows you to generate the `SkullOwner` user profile. Note that, for the sake of reducing the file size, **this differs from the `value` field from the Minecraft-Heads.com API.**

In this case, the `value` column is the ID of the texture/skin on Mojang's servers, and is meant to be used as part of the following URL:

```
https://textures.minecraft.net/texture/VALUE
```

Minecraft then requires said URL to be included in a specific JSON object:

```json
{ "textures": { "SKIN": { "url": "https://textures.minecraft.net/texture/VALUE" } } }
```

and to encode that into base64. The resulting string can then be added to the user profile as the `textures` property ([example](https://sessionserver.mojang.com/session/minecraft/profile/853c80ef3c3749fdaa49938b674adae6)).

If you're using Java, check out the `GameProfile` class from Mojang's AuthLib.

If you're using vanilla commands, here's a template that should (hopefully) work:

```
/give @p minecraft:player_head{SkullOwner:{Id:[I;0,0,0,0],Properties:{textures:[{Value:"BASE64_STRING"}]}}}
```
