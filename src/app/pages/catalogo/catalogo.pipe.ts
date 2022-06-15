import { Pipe,PipeTransform } from "@angular/core";
import { Producto } from "src/app/shared/models/producto.model";

@Pipe({name:'catalogoFilter',pure:false})

export class CustomFilter implements PipeTransform {

  transform(mObjects: Producto[], input: string) {
    if (!input) return mObjects;
    return mObjects.filter(val => this.filterBy(val, input));
  }

  private filterBy(
    mObject: Producto,
    search: string
  ) {
    const reduced = Object.keys(mObject)
      .reduce((prev, current) => this.reduceKeys(prev, current, mObject), "")
      .toLocaleLowerCase();
    return reduced.indexOf(search.toLocaleLowerCase()) > -1;
  }

  private reduceKeys(
    prev: string,
    current: string,
    mObject:Producto
  ): string {
    if (this.isProp(current)) {
      prev = `${prev}\$${mObject[current]}`;
    }
    return prev;
  }

  //Aquí validas que propiedades quieres que se filtren.
  private isProp(key: string): boolean {
    return key.includes("p_nombre") || key.includes("p_marca");
  }
}
