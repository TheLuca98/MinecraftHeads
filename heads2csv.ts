// Download the entire database of minecraft-heads.com as a CSV file
import { stringify } from "https://deno.land/std@0.113.0/encoding/csv.ts";
import { parse } from "https://deno.land/std@0.113.0/flags/mod.ts";

const Config = {
  defaultFile: `heads_${Date.now()}.csv`,
  textureUrlPrefix: "http://textures.minecraft.net/texture/",
  categories: [
    "alphabet",
    "animals",
    "blocks",
    "decoration",
    "food-drinks",
    "humans",
    "humanoid",
    "miscellaneous",
    "monsters",
    "plants",
  ],
};

async function main(args: string[]) {
  const flags = parse(args, {
    default: { outFile: Config.defaultFile },
    alias: { outFile: "o" },
  });

  Deno.createSync(flags.outFile);
  console.log(`Data will be written to ${flags.outFile}`);

  const data = [];
  for (const category of Config.categories) {
    console.log(`Downloading data for ${category}...`);
    const res = await fetch(
      `https://minecraft-heads.com/scripts/api.php?cat=${category}&tags=true`,
    );
    if (!res.ok) {
      throw Error(`Received HTTP ${res.status} ${res.statusText} from API.`);
    }
    const jsonResult = await res.json();
    if (jsonResult != null) {
      for (const entry of jsonResult) {
        data.push({
          name: entry["name"],
          category: category,
          value: parseValue(entry["value"]),
          tags: parseTags(entry["tags"]),
        });
      }
    }
  }

  console.log("Writing to file...");
  const outputCsv = await stringify(data, [
    "name",
    "category",
    "value",
    "tags",
  ]);
  Deno.writeTextFile(flags.outFile, outputCsv);
  console.log(`Done! ${data.length} entries written to ${flags.outFile}.`);
}

function parseValue(base64data: string) {
  const obj = JSON.parse(atob(base64data));
  const url = obj["textures"]["SKIN"]["url"];
  if (!url.startsWith(Config.textureUrlPrefix)) {
    throw Error("Unexpected URL format: " + url);
  }
  return url.replaceAll(Config.textureUrlPrefix, "");
}

function parseTags(tags: string | null) {
  if (tags == null) {
    return "";
  } else {
    return tags.replaceAll(",", "|");
  }
}

main(Deno.args).catch((e) => {
  console.error(`[ERROR] ${e}`);
  Deno.exit(1);
});
