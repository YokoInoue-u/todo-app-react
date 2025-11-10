import { expect, test } from "vitest";

function sum(a: number, b: number): number {
    return a + b;
}

// sum関数が正しく動作するかどうかを確認するテスト
test("sum", () => {
    expect(sum(1, 2)).toBe(3);
});
