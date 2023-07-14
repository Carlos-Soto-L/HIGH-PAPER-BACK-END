import { Request, Response } from 'express';
import DBmanipulation from '../class/cls_DBmanipulation';



class adminController{

    // Método para renderizar la vista vw_categorias
    public static vwCategoria(req: Request, res: Response) {
        res.render('admin/vw_categorias');
    }


    /**
     * Método para crear una nueva categoría.
     *
     * @returns status = 1 corecto, status = 0 error.
     */
    public static createCategoria(req: Request, res: Response) {
        try {
            const { sCategoria,  ...rest } = req.body;

            const oCategoria = {
                sCategoria: sCategoria
            }
            DBmanipulation.insertarDocumento(oCategoria, "cCategoria");

            return res.status(200).json({
                status:1, 
                mensaje: "Categoría dada de alta de forma correcta"
              });

        } catch (error) {
            return res.status(500).json({
                status:0, 
                mensaje: "Ocurrio un error interno"
              });
        }
    }

    // Método para renderizar la vista vw_caracteristicas
    public static vwCaracteristica(req: Request, res: Response) {
        res.render('admin/vw_caracteristicas');
    }


    /**
     * Método para crear una nueva característica.
     *
     * @returns status = 1 corecto, status = 0 error.
     */
    public static createCaracteristica(req: Request, res: Response) {
        try {
            const { sCaracteristica,  ...rest } = req.body;

            const oCaracteristica = {
                sCaracteristica: sCaracteristica
            }
            DBmanipulation.insertarDocumento(oCaracteristica, "cCaracteristica");

            return res.status(200).json({
                status:1, 
                mensaje: "Característica dada de alta de forma correcta"
              });

        } catch (error) {
            return res.status(500).json({
                status:0, 
                mensaje: "Ocurrio un error interno"
              });
        }
    }

    // Renderiza la vista vw_productos
    public static async vwProducto(req: Request, res: Response) {
        const dataCtg = await DBmanipulation.obtenerRegistros("cCategoria")
        const dataCtr = await DBmanipulation.obtenerRegistros("cCaracteristica")
        res.render('admin/vw_productos', {categorias:dataCtg, caracteristicas: dataCtr});
    }

    /**
     * Método para crear un nuevo producto.
     *
     * @returns status = 1 corecto, status = 0 error.
     */
    public static createProducto(req: Request, res: Response) {
        try {

            const { sNombre, sDescripcion, aCategorias, iCantidadExistencia, iPrecio, aCaracteristica, ...rest } = req.body;
            
            const files = req.files;
            var filenames;

            if (files) {
              filenames = Object.values(files).map((file: Express.Multer.File) => "/assets/img/products/" + file.filename);
            }

            const oProducto = {
                sNombre: sNombre,
                sDescripcion: sDescripcion,
                aFotos: filenames,
                aCategorias: Array.isArray(aCategorias)? aCategorias : [aCategorias],
                iCantidadExistencia: iCantidadExistencia,
                iPrecio: iPrecio,
                aCaracteristicas: aCaracteristica,
              };

              DBmanipulation.insertarDocumento(oProducto, "cProducto");

            return res.status(200).json({
                status:1, 
                mensaje: "Producto dado de alta de forma correcta"
              });

        } catch (error) {
            console.log(error)
            return res.status(500).json({
                status:0, 
                mensaje: "Ocurrio un error interno"
              });
        }
    }

    
}

export default adminController;