import { existsSync, promises as fs } from "fs";
import * as path from "path";

async function createFileWithDirectories(filePath: string, content: string) {
  try {
    if (existsSync(filePath)) {
      console.error(`${filePath} already exists.`);
      return;
    }
    const dir = path.dirname(filePath);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(filePath, content, "utf8");

    console.log(`File created successfully at ${filePath}`);
  } catch (error) {
    console.error(`Error creating file at ${filePath}:`, error);
  }
}

(async () => {
  const folder = process.argv.slice(2).join(" ");
  if (!folder) {
    console.error("Please provide a LeetCode title.");
    process.exit(1);
  }
  const id = folder.match(/\d+/)![0];
  await createFileWithDirectories(`./src/leetcode/${folder}/${id}.ts`, "// ");
  await createFileWithDirectories(
    `./src/leetcode/${folder}/${id}.test.ts`,
    `import fn from "./${id}";

describe("LeetCode ${id}", () => {
  it("should pass test case #1", () => {
    const res = fn(
    
    );
    expect(res).toBe();
  });
  it("should pass test case #2", () => {
    const res = fn(
    
    );
    expect(res).toBe();
  });
});`
  );
})();
