import { Articulo } from "../../home/articulos/articulo";
import { Tienda } from "../../home/tiendas/tienda";

export interface TiendaArticulos {
  tienda: Tienda;
  articulos: Articulo[];
}