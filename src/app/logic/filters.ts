// @ts-ignore
import leven from 'leven';

export function filtroPorProximidad(texto: string, property:string, lista: any[], umbral: number): any[] {
  const resultado = lista.map(item => ({
                        item,
                        distance : leven(texto,item[property].toLowerCase() ?? '')
                      })).filter(item =>
                          {
                            console.log(item.distance , umbral)
                            return item.distance <= umbral // Filtrar según la distancia máxima permitida (umbral)
                          }
                        );

  resultado.sort((a,b) => a.distance - b.distance);

  return resultado.map(item => item.item)
}
// export function filterByProximity(text: string, properties:string[], list: any[], umbral: number): any[] {
//   const result = list.map(item => ({
//                         item,
//                         distance : calculeAllProperties(text, properties, item)
//                       })).filter(item =>
//                           {
//                             console.log(item.distance , umbral)
//                           return item.distance <= umbral // Filtrar según la distancia máxima permitida (umbral)
// }                      );

//   result.sort((a,b) => a.distance - b.distance);

//   return result.map(item => item.item)
// }
// function calculeAllProperties(text:string, properties:string[], item:any){
//   let sum = 0;
//   console.log('empezare a calcular el item:',item);
//   for(const property of properties){
//     sum += leven(text, item[property].toString().toLowerCase() ?? '');
//     console.log(sum);
//   }
//   return sum;
// }

export function filterByNumber(filterValue : number, property:string, list:any[], umbral:number): any[]{
  const result = list.map(item => ({
    item,
    distance : calculeDistance(filterValue, item[property] ?? 0)
  })).filter(item => item.distance <= umbral)

  result.sort((a,b) => a.distance - b.distance)

  return result.map(item=>item.item)
}
function calculeDistance(numberA:number,numberB:number){
  return Math.abs(numberA - numberB);
}
