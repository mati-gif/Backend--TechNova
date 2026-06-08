import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validatePassword } from '../helpers/validations.js';

test('Pruebas para validatePassword', async (t) => {

    await t.test('debería rechazar si la contraseña es nula o indefinida', () => {
        assert.strictEqual(validatePassword(null, 7, null, true, true), false);
        assert.strictEqual(validatePassword(undefined, 7, null, true, true), false);
        assert.strictEqual(validatePassword("", 7, null, true, true), false);
    });

    await t.test('debería aceptar una contraseña válida', () => {
        assert.strictEqual(
            validatePassword("Password1", 7, null, true, true),
            true
        );
    });

    await t.test('debería rechazar una contraseña sin mayúsculas', () => {
        assert.strictEqual(
            validatePassword("password1", 7, null, true, true),
            false
        );
    });

    await t.test('debería rechazar una contraseña sin números', () => {
        assert.strictEqual(
            validatePassword("Password", 7, null, true, true),
            false
        );
    });

    await t.test('debería rechazar si no cumple la longitud mínima', () => {
        assert.strictEqual(
            validatePassword("Pass1", 7, null, true, true),
            false
        );
    });

    await t.test('debería rechazar si supera la longitud máxima', () => {
        assert.strictEqual(
            validatePassword("Password12345", null, 10, true, true),
            false
        );
    });
});
