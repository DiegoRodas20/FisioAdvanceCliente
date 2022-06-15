import { Pipe,PipeTransform } from "@angular/core";
import { Categoria } from "src/app/shared/models/producto.model";

@Pipe({name:'categoriaFilter',pure:false})

export class categoriaFilter implements PipeTransform {

  transform(mObjects: Categoria[], input: string) {
    if (!input) return mObjects;
    return mObjects.filter(val => this.filterBy(val, input));
  }

  private filterBy(
    mObject: Categoria,
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
    mObject:Categoria
  ): string {
    if (this.isProp(current)) {
      prev = `${prev}\$${mObject[current]}`;
    }
    return prev;
  }

  //Aquí validas que propiedades quieres que se filtren.
  private isProp(key: string): boolean {
    return key.includes("cP_categoria");
  }
}
