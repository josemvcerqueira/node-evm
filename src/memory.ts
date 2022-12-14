import { BigNumber, ethers } from 'ethers';

import { BN_ZERO, MAX_WORD_SIZE } from './constants';
import { InvalidMemoryAccess, InvalidMemoryValue } from './errors';

class Memory {
  readonly #memory: Record<string, string> = {};

  public store(offset: string, value: string): void {
    const bnOffset = BigNumber.from(offset);

    if (bnOffset.lt(0) || bnOffset.gt(ethers.constants.MaxUint256))
      throw new InvalidMemoryAccess(`Invalid offset: ${offset}`);

    const bnValue = BigNumber.from(value);

    if (bnValue.lt(0) || bnValue.gt(MAX_WORD_SIZE)) throw new InvalidMemoryValue(`Invalid value: ${value}`);

    this.#memory[offset] = value;
  }

  public load(offset: string): string {
    const bnOffset = BigNumber.from(offset);

    if (bnOffset.lt(0)) throw new InvalidMemoryAccess(`Invalid offset: ${offset}`);

    return this.#memory[offset] || BN_ZERO;
  }

  public loadRange(offset: string, length: string): Buffer {
    const offsetBN = BigNumber.from(offset);
    const lengthBN = BigNumber.from(length);
    if (offsetBN.lt(0)) throw new InvalidMemoryAccess(`Invalid offset: ${offset}`);

    const data: Array<string> = [];
    let counter = offsetBN;

    while (lengthBN.add(offsetBN).gt(counter)) {
      data.push(this.load(counter.toString()));
      counter = counter.add(1);
    }

    return Buffer.from(data.map(Number));
  }

  public print() {
    console.log(this.#memory);
  }
}

export default Memory;
