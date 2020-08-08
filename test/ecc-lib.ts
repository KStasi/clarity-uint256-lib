import {
  Client,
  Provider,
  ProviderRegistry,
  Result,
} from "@blockstack/clarity";
import { assert } from "chai";

describe("hello world contract test suite", () => {
  let ellipticCurveClient: Client;
  let provider: Provider;

  before(async () => {
    provider = await ProviderRegistry.createProvider();
    ellipticCurveClient = new Client(
      "SP3GWX3NE58KXHESRYE4DYQ1S31PQJTCRXB3PE9SB.ecc-lib",
      "ecc-lib",
      provider
    );
  });

  it("should have a valid syntax", async () => {
    await ellipticCurveClient.checkContract();
  });

  describe("deploying an instance of the contract", () => {
    before(async () => {
      await ellipticCurveClient.deployContract();
    });

    it("should return valid result for typical cases", async () => {
      const query = ellipticCurveClient.createQuery({
        method: {
          name: "ecc-add",
          args: ["(tuple (x 1) (y 2))", "(tuple (x 3) (y 4))"],
        },
      });
      const receipt = await ellipticCurveClient.submitQuery(query);
      const result = Result.unwrap(receipt);
      assert.equal(result, "(ok (tuple (x -3) (y 2)))");
    });

    it("should return valid result for tangent", async () => {
      const query = ellipticCurveClient.createQuery({
        method: {
          name: "ecc-add",
          args: ["(tuple (x -1) (y 4))", "(tuple (x 1) (y 2))"],
        },
      });
      const receipt = await ellipticCurveClient.submitQuery(query);
      const result = Result.unwrap(receipt);
      assert.equal(result, "(ok (tuple (x 1) (y -2)))");
    });

    it("should return valid result for equal points", async () => {
      const query = ellipticCurveClient.createQuery({
        method: {
          name: "ecc-add",
          args: ["(tuple (x 2) (y 1))", "(tuple (x 2) (y 1))"],
        },
      });
      const receipt = await ellipticCurveClient.submitQuery(query);
      const result = Result.unwrap(receipt);
      assert.equal(result, "(ok (tuple (x 32) (y -181)))");
    });

    it("should return 0 0 in case of equal points and y1=y2=0", async () => {
      const query = ellipticCurveClient.createQuery({
        method: {
          name: "ecc-add",
          args: ["(tuple (x 1) (y 0))", "(tuple (x 1) (y 0))"],
        },
      });
      const receipt = await ellipticCurveClient.submitQuery(query);
      const result = Result.unwrap(receipt);
      assert.equal(result, "(ok (tuple (x 0) (y 0)))");
    });
    it("should return 0 0 in case of different points and x1=x2", async () => {
      const query = ellipticCurveClient.createQuery({
        method: {
          name: "ecc-add",
          args: ["(tuple (x 1) (y 2))", "(tuple (x 1) (y 4))"],
        },
      });
      const receipt = await ellipticCurveClient.submitQuery(query);
      const result = Result.unwrap(receipt);
      assert.equal(result, "(ok (tuple (x 0) (y 0)))");
    });
  });

  after(async () => {
    await provider.close();
  });
});
