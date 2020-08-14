import {
  Client,
  Provider,
  ProviderRegistry,
  Result,
} from "@blockstack/clarity";
import { assert } from "chai";
import { hexToUint256 } from "./utils";

describe("big-uint contract test suite", () => {
  let bigIntClient: Client;
  let provider: Provider;

  before(async () => {
    provider = await ProviderRegistry.createProvider();
    bigIntClient = new Client(
      "SZ2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKQ9H6DPR.uint256-lib",
      "uint256-lib",
      provider
    );
  });

  it("should have a valid syntax", async () => {
    await bigIntClient.checkContract();
  });

  describe("deploying an instance of the contract", () => {
    before(async () => {
      await bigIntClient.deployContract();
    });

    it("should return valid result for add", async () => {
      let a =
        "afbd122d3c1dd8ada1cb727ef867ac6286401d81af2e18c471fc6ea7e769e21f";
      let b =
        "83e8223b132b0fa8014650f9a2da5a3e25edd4eea75b888e208e440eb14c0780";

      const query = bigIntClient.createQuery({
        method: {
          name: "uint256-add",
          args: [hexToUint256(a), hexToUint256(b)],
        },
      });
      const receipt = await bigIntClient.submitQuery(query);
      const result = Result.unwrap(receipt);
      assert.equal(
        result,
        "(ok (tuple (i0 u22168182363412555861) (i1 u11750387825554622112) (i2 u12406839112777703762) (i3 u10559448773639399839)))"
      );
    });
    it("should return valid result for sub", async () => {
      let a =
        "afbd122d3c1dd8ada1cb727ef867ac6286401d81af2e18c471fc6ea7e769e21f";
      let b =
        "83e8223b132b0fa8014650f9a2da5a3e25edd4eea75b888e208e440eb14c0780";
      const query = bigIntClient.createQuery({
        method: {
          name: "uint256-sub",
          args: [hexToUint256(a), hexToUint256(b)],
        },
      });
      const receipt = await bigIntClient.submitQuery(query);
      const result = Result.unwrap(receipt);
      assert.equal(
        result,
        "(ok (tuple (i0 u3158413062041684229) (i1 u11566688074520678948) (i2 u6940689772059988022) (i3 u5867674202036624031)))"
      );
    });
    it("should return valid result for sub", async () => {
      let a = "1805be729eafb6751f92624433378e6286401d81af2e18c4";
      let b = "1805be729eafb674f9cbf0c11ee485fa6dd3bae110df0800";
      const query = bigIntClient.createQuery({
        method: {
          name: "uint256-sub",
          args: [hexToUint256(a), hexToUint256(b)],
        },
      });
      const receipt = await bigIntClient.submitQuery(query);
      const result = Result.unwrap(receipt);
      assert.equal(
        result,
        "(ok (tuple (i0 u0) (i1 u0) (i2 u2721987832587683944) (i3 u1759889996385292484)))"
      );
    });

    it("should return valid result for mul", async () => {
      let a =
        "afbd122d3c1dd8ada1cb727ef867ac6286401d81af2e18c471fc6ea7e769e21f";
      let b =
        "83e8223b132b0fa8014650f9a2da5a3e25edd4eea75b888e208e440eb14c0780";
      const query = bigIntClient.createQuery({
        method: {
          name: "uint256-mul",
          args: [hexToUint256(a), hexToUint256(b)],
        },
      });
      const receipt = await bigIntClient.submitQuery(query);
      const result = Result.unwrap(receipt);
      assert.equal(
        result,
        "(ok (tuple (i0 u6524901282080590640) (i1 u15772065633194604996) (i2 u6945764279577247350) (i3 u5070399847723181586) (i4 u3771311903688265761) (i5 u4258453872344136460) (i6 u4874386124971066785) (i7 u16943506895209228416)))"
      );
    });

    it("should return valid result for div", async () => {
      let a =
        "afbd122d3c1dd8ada1cb727ef867ac6286401d81af2e18c471fc6ea7e769e21f";
      let b = "208e440eb14c0780";
      const query = bigIntClient.createQuery({
        method: {
          name: "uint256-div",
          args: [hexToUint256(a), hexToUint256(b)],
        },
      });
      const receipt = await bigIntClient.submitQuery(query);
      const result = Result.unwrap(receipt);
      assert.equal(
        result,
        "(ok (tuple (i0 u5) (i1 u7343362234578611740) (i2 u10822994926559106398) (i3 u7674250338629420387)))"
      );
    });

    it("should return valid result for div", async () => {
      let a =
        "afbd122d3c1dd8ada1cb727ef867ac6286401d81af2e18c471fc6ea7e769e21f";
      let b = "25edd4eea75b888e208e440eb14c0780";

      const query = bigIntClient.createQuery({
        method: {
          name: "uint256-div",
          args: [hexToUint256(a), hexToUint256(b)],
        },
      });
      const receipt = await bigIntClient.submitQuery(query);
      const result = Result.unwrap(receipt);
      assert.equal(
        result,
        "(ok (tuple (i0 u0) (i1 u4) (i2 u11683287130199150832) (i3 u18371914043937723798)))"
      );
    });

    it("should return valid result for div", async () => {
      let a =
        "afbd122d3c1dd8ada1cb727ef867ac6286401d81af2e18c471fc6ea7e769e21f";
      let b = "014650f9a2da5a3e25edd4eea75b888e208e440eb14c0780";

      const query = bigIntClient.createQuery({
        method: {
          name: "uint256-div",
          args: [hexToUint256(a), hexToUint256(b)],
        },
      });
      const receipt = await bigIntClient.submitQuery(query);
      const result = Result.unwrap(receipt);
      assert.equal(
        result,
        "(ok (tuple (i0 u0) (i1 u0) (i2 u137) (i3 u16039705086760724630)))"
      );
    });

    it("should return valid result for mod", async () => {
      let a =
        "afbd122d3c1dd8ada1cb727ef867ac6286401d81af2e18c471fc6ea7e769e21f";
      let b = "014650f9a2da5a3e25edd4eea75b888e208e440eb14c0780";

      const query = bigIntClient.createQuery({
        method: {
          name: "uint256-mod",
          args: [hexToUint256(a), hexToUint256(b)],
        },
      });
      const receipt = await bigIntClient.submitQuery(query);
      const result = Result.unwrap(receipt);
      assert.equal(
        result,
        "(ok (tuple (i0 u0) (i1 u32943242211900740) (i2 u10784891128042257264) (i3 u6497780345443810591)))"
      );
    });

    it("should return valid result for unsafe rshift", async () => {
      let a =
        "afbd122d3c1dd8ada1cb727ef867ac6286401d81af2e18c471fc6ea7e769e21f";
      let b = "u2";

      const query = bigIntClient.createQuery({
        method: {
          name: "uint256-rshift-unsafe",
          args: [hexToUint256(a), b],
        },
      });
      const receipt = await bigIntClient.submitQuery(query);
      const result = Result.unwrap(receipt);
      assert.equal(
        result,
        "(ok (tuple (i0 u50653190850908480182) (i1 u9740663652731498890) (i2 u1801569622256280337) (i3 u14407501877642496124)))"
      );
    });

    it("should return valid result for unsafe rshift", async () => {
      let a =
        "afbd122d3c1dd8ada1cb727ef867ac6286401d81af2e18c471fc6ea7e769e21f";
      let b = "u128";

      const query = bigIntClient.createQuery({
        method: {
          name: "uint256-rshift-unsafe",
          args: [hexToUint256(a), b],
        },
      });
      const receipt = await bigIntClient.submitQuery(query);
      const result = Result.unwrap(receipt);
      assert.equal(
        result,
        "(ok (tuple (i0 u9673764442418845892) (i1 u8213561487838011935) (i2 u0) (i3 u0)))"
      );
    });

    it("should return valid result for unsafe rshift", async () => {
      let a =
        "afbd122d3c1dd8ada1cb727ef867ac6286401d81af2e18c471fc6ea7e769e21f";
      let b = "u256";

      const query = bigIntClient.createQuery({
        method: {
          name: "uint256-rshift-unsafe",
          args: [hexToUint256(a), b],
        },
      });
      const receipt = await bigIntClient.submitQuery(query);
      const result = Result.unwrap(receipt);
      assert.equal(result, "(ok (tuple (i0 u0) (i1 u0) (i2 u0) (i3 u0)))");
    });

    it("should return valid result for unsafe lshift-1", async () => {
      let a =
        "afbd122d3c1dd8ada1cb727ef867ac6286401d81af2e18c471fc6ea7e769e21f";

      const query = bigIntClient.createQuery({
        method: {
          name: "uint256-lshift-1-unsafe",
          args: [hexToUint256(a)],
        },
      });
      const receipt = await bigIntClient.submitQuery(query);
      const result = Result.unwrap(receipt);
      assert.equal(
        result,
        "(ok (tuple (i0 u6331648856363560022) (i1 u15052641011873601073) (i2 u4836882221209422946) (i3 u4106780743919005967)))"
      );
    });

    it("should return valid result for check bit", async () => {
      let a =
        "afbd122d3c1dd8ada1cb727ef867ac6286401d81af2e18c471fc6ea7e769e21f";
      let b = "u65";

      const query = bigIntClient.createQuery({
        method: {
          name: "uint256-check-bit",
          args: [hexToUint256(a), b],
        },
      });
      const receipt = await bigIntClient.submitQuery(query);
      const result = Result.unwrap(receipt);
      assert.equal(result, "(ok u0)");
    });

    it("should return valid result for check bit", async () => {
      let a =
        "afbd122d3c1dd8ada1cb727ef867ac6286401d81af2e18c471fc6ea7e769e21f";
      let aBin =
        "1010111110111101000100100010110100111100000111011101100010101101101000011100101101110010011111101111100001100111101011000110001010000110010000000001110110000001101011110010111000011000110001000111000111111100011011101010011111100111011010011110001000011111";
      for (let i = 0; i < aBin.length; i++) {
        const query = bigIntClient.createQuery({
          method: {
            name: "uint256-check-bit",
            args: [hexToUint256(a), `u${i}`],
          },
        });
        const receipt = await bigIntClient.submitQuery(query);
        const result = Result.unwrap(receipt);
        assert.equal(result, `(ok u${aBin[aBin.length - i - 1]})`);
      }
    });

    it("should return valid result for check bit", async () => {
      let a =
        "afbd122d3c1dd8ada1cb727ef867ac6286401d81af2e18c471fc6ea7e769e21f";
      let b = "u255";

      const query = bigIntClient.createQuery({
        method: {
          name: "uint256-check-bit",
          args: [hexToUint256(a), b],
        },
      });
      const receipt = await bigIntClient.submitQuery(query);
      const result = Result.unwrap(receipt);
      assert.equal(result, "(ok u1)");
    });

    it("should return valid result for mul-short", async () => {
      let a = "25edd4eea75b888e208e440eb14c0780";
      let b = "u11683287130199150833";
      const query = bigIntClient.createQuery({
        method: {
          name: "uint256-mul-short",
          args: [hexToUint256(a), b],
        },
      });
      const receipt = await bigIntClient.submitQuery(query);
      const result = Result.unwrap(receipt);
      assert.equal(
        result,
        "(ok (tuple (i0 u0) (i1 u1730999031291688565) (i2 u2286075644603272840) (i3 u10259761731834941312)))"
      );
    });

    it("should return true for uint256 equal 0", async () => {
      let a = "00";
      const query = bigIntClient.createQuery({
        method: {
          name: "uint256-is-zero",
          args: [hexToUint256(a)],
        },
      });
      const receipt = await bigIntClient.submitQuery(query);
      const result = Result.unwrap(receipt);
      assert.equal(result, "(ok true)");
    });

    it("should return false for uint256 bit equal 0", async () => {
      let a =
        "afbd122d3c1dd8ada1cb727ef867ac6286401d81af2e18c471fc6ea7e769e21f";
      const query = bigIntClient.createQuery({
        method: {
          name: "uint256-is-zero",
          args: [hexToUint256(a)],
        },
      });
      const receipt = await bigIntClient.submitQuery(query);
      const result = Result.unwrap(receipt);
      assert.equal(result, "(ok false)");
    });

    it("should return false for uint256 bit equal 0", async () => {
      let a =
        "afbd122d3c1dd8ada1cb727ef867ac6286401d81af2e18c471fc6ea7e769e21f";
      const query = bigIntClient.createQuery({
        method: {
          name: "uint256-bits",
          args: [hexToUint256(a)],
        },
      });
      const receipt = await bigIntClient.submitQuery(query);
      const result = Result.unwrap(receipt);
      assert.equal(result, "(ok u256)");
    });
  });

  describe("deploying an instance of the contract", () => {
    it("should fail substraction if result is negative", async () => {
      let b =
        "afbd122d3c1dd8ada1cb727ef867ac6286401d81af2e18c471fc6ea7e769e21f";
      let a =
        "83e8223b132b0fa8014650f9a2da5a3e25edd4eea75b888e208e440eb14c0780";

      const query = bigIntClient.createQuery({
        method: {
          name: "uint256-sub",
          args: [hexToUint256(a), hexToUint256(b)],
        },
      });
      const receipt = await bigIntClient.submitQuery(query);
      const result = Result.unwrap(receipt);
      assert.equal(result, "(err 1)");
    });
  });

  after(async () => {
    await provider.close();
  });
});
