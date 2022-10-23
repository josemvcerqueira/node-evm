import { BigNumber, ethers } from 'ethers';

import { BN_ZERO } from './constants';
import { InvalidStackItem, StackOverFlow, StackUnderFlow } from './errors';

class Stack {
  readonly #maxDepth = 1024;
  #stack: Array<string> = [];

  public push(item: string): void {
    const bnValue = BigNumber.from(item);

    if (bnValue.lt(0) || bnValue.gt(ethers.constants.MaxUint256)) throw new InvalidStackItem(`${item} is out of range`);

    if (this.#stack.length === this.#maxDepth) throw new StackOverFlow('The stack has a maximum size of 1024 items');

    this.#stack.push(item);
  }

  public pop(): string {
    if (!this.#stack.length) throw new StackUnderFlow('The stack has no items to remove');

    return this.#stack.pop() || BN_ZERO;
  }

  public peek(index: number): string {
    return index + 1 > this.#stack.length ? BN_ZERO : this.#stack[index];
  }

  public swap(index: number) {
    const stackLength = this.#stack.length;

    if (index > stackLength) throw new StackOverFlow(`Index ${index} is larger than stack length of ${stackLength}`);

    const firstElem = this.#stack[0];

    this.#stack[0] = this.#stack[index];
    this.#stack[index] = firstElem;
  }

  public print() {
    console.log(this.#stack);
  }
}

export default Stack;
