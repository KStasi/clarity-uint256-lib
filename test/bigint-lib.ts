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
      "SZ2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKQ9H6DPR.bigint-lib",
      "bigint-lib",
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

    it("should return valid result for typical cases", async () => {
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
    it("should return valid result for typical cases", async () => {
      let a =
        "afbd122d3c1dd8ada1cb727ef867ac6286401d81af2e18c471fc6ea7e769e21f";
      let b =
        "83e8223b132b0fa8014650f9a2da5a3e25edd4eea75b888e208e440eb14c0780";
      console.log(hexToUint256(a));
      console.log(hexToUint256(b));
      console.log((BigInt("0x" + a) - BigInt("0x" + b)).toString());
      console.log(
        hexToUint256((BigInt("0x" + a) - BigInt("0x" + b)).toString())
      );
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
  });

  after(async () => {
    await provider.close();
  });
});
