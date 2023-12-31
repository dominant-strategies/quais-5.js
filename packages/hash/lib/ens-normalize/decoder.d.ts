/**
 * MIT License
 *
 * Copyright (c) 2021 Andrew Raffensperger
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 * This is a near carbon-copy of the original source (link below) with the
 * TypeScript typings added and a few tweaks to make it ES3-compatible.
 *
 * See: https://github.com/adraffy/ens-normalize.js
 */
export type Numbers = Uint8Array | Array<number>;
export type NextFunc = (...args: Array<any>) => number;
export declare function decode_arithmetic(bytes: Numbers): Array<number>;
export declare function read_payload(v: Numbers): NextFunc;
export declare function read_compressed_payload(bytes: Numbers): NextFunc;
export declare function signed(i: number): number;
export declare function read_member_array(next: NextFunc, lookup?: Record<number, number>): number[];
export declare function read_mapped_map(next: NextFunc): Record<number, Array<number>>;
export declare function read_zero_terminated_array(next: NextFunc): Array<number>;
export type Branch = {
    set: Set<number>;
    node: Node;
};
export type Node = {
    branches: Array<Branch>;
    valid: number;
    fe0f: boolean;
    save: boolean;
    check: boolean;
};
export declare function read_emoji_trie(next: NextFunc): Node;
//# sourceMappingURL=decoder.d.ts.map