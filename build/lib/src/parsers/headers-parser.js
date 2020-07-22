"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseHeaders = void 0;
const errors_1 = require("../errors");
const http_1 = require("../http");
const util_1 = require("../util");
const parser_helpers_1 = require("./parser-helpers");
const type_parser_1 = require("./type-parser");
function parseHeaders(parameter, typeTable, lociTable) {
    var _a;
    parameter.getDecoratorOrThrow("headers");
    if (parameter.hasQuestionToken()) {
        return util_1.err(new errors_1.OptionalNotAllowedError("@headers parameter cannot be optional", {
            file: parameter.getSourceFile().getFilePath(),
            position: parameter.getQuestionTokenNodeOrThrow().getPos()
        }));
    }
    const headerTypeLiteral = parser_helpers_1.getParameterTypeAsTypeLiteralOrThrow(parameter);
    const headers = [];
    for (const propertySignature of headerTypeLiteral.getProperties()) {
        const nameResult = extractHeaderName(propertySignature);
        if (nameResult.isErr())
            return nameResult;
        const name = nameResult.unwrap();
        const typeResult = extractHeaderType(propertySignature, typeTable, lociTable);
        if (typeResult.isErr())
            return typeResult;
        const type = typeResult.unwrap();
        const description = (_a = parser_helpers_1.getJsDoc(propertySignature)) === null || _a === void 0 ? void 0 : _a.getDescription().trim();
        const optional = propertySignature.hasQuestionToken();
        headers.push({ name, type, description, optional });
    }
    return util_1.ok(headers.sort((a, b) => (b.name > a.name ? -1 : 1)));
}
exports.parseHeaders = parseHeaders;
function extractHeaderName(propertySignature) {
    const name = parser_helpers_1.getPropertyName(propertySignature);
    if (!/^[\w-]*$/.test(name)) {
        return util_1.err(new errors_1.ParserError("@headers field name may only contain alphanumeric, underscore and hyphen characters", {
            file: propertySignature.getSourceFile().getFilePath(),
            position: propertySignature.getPos()
        }));
    }
    if (name.length === 0) {
        return util_1.err(new errors_1.ParserError("@headers field name must not be empty", {
            file: propertySignature.getSourceFile().getFilePath(),
            position: propertySignature.getPos()
        }));
    }
    return util_1.ok(name);
}
function extractHeaderType(propertySignature, typeTable, lociTable) {
    const typeResult = type_parser_1.parseType(propertySignature.getTypeNodeOrThrow(), typeTable, lociTable);
    if (typeResult.isErr())
        return typeResult;
    if (!http_1.isHeaderTypeSafe(typeResult.unwrap(), typeTable)) {
        return util_1.err(new errors_1.ParserError("header type may only derive from string or number types", {
            file: propertySignature.getSourceFile().getFilePath(),
            position: propertySignature.getPos()
        }));
    }
    return typeResult;
}
