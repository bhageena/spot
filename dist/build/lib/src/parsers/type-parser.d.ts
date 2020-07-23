import { TypeNode } from "ts-morph";
import { ParserError } from "../errors";
import { LociTable } from "../locations";
import { Type, TypeTable } from "../types";
import { Result } from "../util";
export declare function parseType(typeNode: TypeNode, typeTable: TypeTable, lociTable: LociTable): Result<Type, ParserError>;
