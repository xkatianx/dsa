import fn from "./767";

describe("LeetCode 767", () => {
  it("should pass test case #1", () => {
    const res = fn("aab");
    expect(res).not.toMatch(/(.)\1/);
  });
  it("should pass test case #2", () => {
    const res = fn("aaab");
    expect(res).toBe("");
  });
});

describe("LeetCode 767 more tests", () => {
  it("should pass test case #1", () => {
    const res = fn(
      "tndsewnllhrtwsvxenkscbivijfqnysamckzoyfnapuotmdexzkkrpmppttficzerdndssuveompqkemtbwbodrhwsfpbmkafpwyedpcowruntvymxtyyejqtajkcjakghtdwmuygecjncxzcxezgecrxonnszmqmecgvqqkdagvaaucewelchsmebikscciegzoiamovdojrmmwgbxeygibxxltemfgpogjkhobmhwquizuwvhfaiavsxhiknysdghcawcrphaykyashchyomklvghkyabxatmrkmrfsppfhgrwywtlxebgzmevefcqquvhvgounldxkdzndwybxhtycmlybhaaqvodntsvfhwcuhvuccwcsxelafyzushjhfyklvghpfvknprfouevsxmcuhiiiewcluehpmzrjzffnrptwbuhnyahrbzqvirvmffbxvrmynfcnupnukayjghpusewdwrbkhvjnveuiionefmnfxao"
    );
    expect(res).not.toMatch(/(.)\1/);
  });
});
