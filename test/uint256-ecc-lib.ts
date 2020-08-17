import {
  Client,
  Provider,
  ProviderRegistry,
  Result,
} from "@blockstack/clarity";
import { assert } from "chai";
import { hexToUint256 } from "./utils";

describe("elliptic curve contract test suite", () => {
  let ellipticCurveClient: Client;
  let provider: Provider;

  before(async () => {
    provider = await ProviderRegistry.createProvider();
    ellipticCurveClient = new Client(
      "S1G2081040G2081040G2081040G208105NK8PE5.uint256-ecc-lib",
      "uint256-ecc-lib",
      provider
    );
  });

  it("should have a valid syntax", async () => {
    await ellipticCurveClient.checkContract();
  });

  describe("deploying an instance of the uint256-ecc-lib contract", () => {
    before(async () => {
      await ellipticCurveClient.deployContract();
    });

    it("should return valid result for points addition", async () => {
      let a =
        "0fd5b4919e42654e16e88cc9c09948162c8fdb854073636a09785da425435a47";
      let b =
        "1ca5299759da5f0ef7320f0df03dda2f7b9bf8759d308966c25d113d367430d5";

      const query = ellipticCurveClient.createQuery({
        method: {
          name: "ecc-add",
          args: [
            `(tuple (x ${hexToUint256(a)}) (y ${hexToUint256(b)}))`,
            `(tuple (x ${hexToUint256(a)}) (y ${hexToUint256(b)}))`,
          ],
        },
      });
      const receipt = await ellipticCurveClient.submitQuery(query);
      const result = Result.unwrap(receipt);
      assert.equal(
        result,
        "(ok (tuple (x (tuple (i0 u189834276171613212) (i1 u13779477026102480474) (i2 u10939824806932781592) (i3 u17211970557197399602))) (y (tuple (i0 u2064101734243524366) (i1 u17812316028743309871) (i2 u8906985872087353702) (i3 u14005369370796372181)))))"
      );
    });

    it("should return valid result for tangent", async () => {
      let a =
        "0fd5b4919e42654e16e88cc9c09948162c8fdb854073636a09785da425435a47";
      let b =
        "1ca5299759da5f0ef7320f0df03dda2f7b9bf8759d308966c25d113d367430d5";

      const query = ellipticCurveClient.createQuery({
        method: {
          name: "ecc-add",
          args: [
            `(tuple (x ${hexToUint256(b)}) (y ${hexToUint256(a)}))`,
            `(tuple (x ${hexToUint256(a)}) (y ${hexToUint256(b)}))`,
          ],
        },
      });
      const receipt = await ellipticCurveClient.submitQuery(query);
      const result = Result.unwrap(receipt);
      assert.equal(
        result,
        "(ok (tuple (x (tuple (i0 u923085116116826560) (i1 u16161591967164437017) (i2 u5695959447390463484) (i3 u13322971067668551309))) (y (tuple (i0 u1046099480040891199) (i1 u13207729622237184232) (i2 u16187858094940051037) (i3 u10523157098238672685)))))"
      );
    });

    it("should return valid result for 0 0 points", async () => {
      let a = "0";
      let b = "0";

      const query = ellipticCurveClient.createQuery({
        method: {
          name: "ecc-add",
          args: [
            `(tuple (x ${hexToUint256(a)}) (y ${hexToUint256(b)}))`,
            `(tuple (x ${hexToUint256(a)}) (y ${hexToUint256(b)}))`,
          ],
        },
      });
      const receipt = await ellipticCurveClient.submitQuery(query);
      const result = Result.unwrap(receipt);
      assert.equal(
        result,
        "(ok (tuple (x (tuple (i0 u0) (i1 u0) (i2 u0) (i3 u0))) (y (tuple (i0 u0) (i1 u0) (i2 u0) (i3 u0)))))"
      );
    });

    it("should return 0 0 in case of equal points and y1=y2=0", async () => {
      let a =
        "0fd5b4919e42654e16e88cc9c09948162c8fdb854073636a09785da425435a47";
      let b = "0";

      const query = ellipticCurveClient.createQuery({
        method: {
          name: "ecc-add",
          args: [
            `(tuple (x ${hexToUint256(a)}) (y ${hexToUint256(b)}))`,
            `(tuple (x ${hexToUint256(a)}) (y ${hexToUint256(b)}))`,
          ],
        },
      });
      const receipt = await ellipticCurveClient.submitQuery(query);
      const result = Result.unwrap(receipt);
      assert.equal(
        result,
        "(ok (tuple (x (tuple (i0 u0) (i1 u0) (i2 u0) (i3 u0))) (y (tuple (i0 u0) (i1 u0) (i2 u0) (i3 u0)))))"
      );
    });

    it("should return 0 0 in case of different points and x1=x2", async () => {
      let a =
        "1ca5299759da5f0ef7320f0df03dda2f7b9bf8759d308966c25d113d367430d5";
      let b =
        "0fd5b4919e42654e16e88cc9c09948162c8fdb854073636a09785da425435a47";

      const query = ellipticCurveClient.createQuery({
        method: {
          name: "ecc-add",
          args: [
            `(tuple (x ${hexToUint256(a)}) (y ${hexToUint256(a)}))`,
            `(tuple (x ${hexToUint256(a)}) (y ${hexToUint256(b)}))`,
          ],
        },
      });
      const receipt = await ellipticCurveClient.submitQuery(query);
      const result = Result.unwrap(receipt);
      assert.equal(
        result,
        "(ok (tuple (x (tuple (i0 u0) (i1 u0) (i2 u0) (i3 u0))) (y (tuple (i0 u0) (i1 u0) (i2 u0) (i3 u0)))))"
      );
    });

    it("should return valid result for multiplication", async () => {
      let a = "02";
      let b = "01";

      const query = ellipticCurveClient.createQuery({
        method: {
          name: "ecc-mul",
          args: [`(tuple (x ${hexToUint256(a)}) (y ${hexToUint256(b)}))`, `u2`],
        },
      });
      const receipt = await ellipticCurveClient.submitQuery(query);
      const result = Result.unwrap(receipt);
      assert.equal(
        result,
        "(ok (tuple (x (tuple (i0 u0) (i1 u0) (i2 u0) (i3 u32))) (y (tuple (i0 u0) (i1 u0) (i2 u0) (i3 u179)))))"
      );
    });
  });

  after(async () => {
    await provider.close();
  });
});
