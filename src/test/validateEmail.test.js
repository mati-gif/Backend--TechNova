import { test } from "node:test";
import assert from "node:assert/strict";
import { validateEmail } from "../helpers/validateEmail.js";

test("Pruebas para validateEmail", async (t) => {
  await t.test(
    'Debería retornar "admin" para correos que terminen en @admin.com',
    () => {
      const result = validateEmail("test@admin.com");
      assert.strictEqual(result, "admin");
    },
  );

  await t.test(
    'Debería retornar "superadmin" para correos que terminen en @superadmin.com',
    () => {
      const result = validateEmail("test@superadmin.com");
      assert.strictEqual(result, "superadmin");
    },
  );

  await t.test(
    'Debería retornar "user" para cualquier otro dominio de correo',
    () => {
      const result = validateEmail("test@gmail.com");
      assert.strictEqual(result, "user");
    },
  );
});
