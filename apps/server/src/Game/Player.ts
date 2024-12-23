import Property from "./Property";

export default class Player {
  public cash: number = 2000;
  private position = 0;
  constructor(public name: string) {}
  public move(squares: number) {
    this.position = (this.position + squares) % 32;
  }
  public buy(property: Property) {
    if (this.cash < property.price) {
      return {
        success: false,
        message: `${this.name} doesn't have ${property.price}`,
      };
    }
    this.cash = this.cash - property.price;
    property.setOwner(this.name);
    return { success: true };
  }
}
