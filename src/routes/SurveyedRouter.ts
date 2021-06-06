import { Router, Request, Response } from "express";
import { config } from "../config/config";
var mssql = require('mssql');

class SurveyedRouter {
  router: Router;

  constructor() {
    this.router = Router();
  }
  /**
   * @method post
   * @param req 
   * @param res 
   */
  async CrearSucursal (req: Request, res: Response){
    let { idSucursal,nombre,descripcion } = req.body;
    new mssql.ConnectionPool(config).connect().then((pool:any) => {
      return pool.request()
      .input('idSucursal',mssql.CHAR(4),idSucursal)
      .input('nombre',mssql.VARCHAR(50),nombre)
      .input('descripcion',mssql.VARCHAR(200),descripcion)
      .execute('CrearSucursal')
      }).then((result: { recordset: any; }) => {
      let rows = result.recordset
      res.setHeader('Access-Control-Allow-Origin', '*')
      res.status(201).json(rows);
      mssql.close();
    }).catch((err: any) => {
      res.status(500).send({ message: `${err}`})
      mssql.close();
    });
  }
    /**
   * @method post
   * @param req 
   * @param res 
   */
  async InsertarAbono (req: Request, res: Response){
    let { idAbono,FormaPago,idCliente,idFactura,fecha,monto } = req.body;
    new mssql.ConnectionPool(config).connect().then((pool:any) => {
      return pool.request()
      .input('idAbono',mssql.CHAR(4),idAbono)
      .input('FormaPago',mssql.VARCHAR(30),FormaPago)
      .input('idCliente',mssql.CHAR(11),idCliente)
      .input('idFactura',mssql.INT,idFactura)
      .input('fecha',mssql.DATE,fecha)
      .input('monto',mssql.FLOAT,monto)
      .execute('InsertarAbono')
      }).then((result: { recordset: any; }) => {
      let rows = result.recordset
      res.setHeader('Access-Control-Allow-Origin', '*')
      res.status(201).json(rows);
      mssql.close();
    }).catch((err: any) => {
      res.status(500).send({ message: `${err}`})
      mssql.close();
    });
  }
    /**
   * @method post
   * @param req 
   * @param res 
   */
  async CrearFacturaContado (req: Request, res: Response){
    console.warn("Entro");
    let { idSucursal,idCliente,montoDescuento,montoImpuesto,montoNeto,fecha } = req.body;
    new mssql.ConnectionPool(config).connect().then((pool:any) => {
      return pool.request()
      .input('idSucursal',mssql.CHAR(4),idSucursal)
      .input('idCliente',mssql.CHAR(11),idCliente)
      .input('montoDescuento',mssql.FLOAT,montoDescuento)
      .input('montoImpuesto',mssql.FLOAT,montoImpuesto)
      .input('montoNeto',mssql.FLOAT,montoNeto)
      .input('fecha',mssql.DATE,fecha)
      .execute('CrearFacturaContado')
      }).then((result: { recordset: any; }) => {
      let rows = result.recordset
      res.setHeader('Access-Control-Allow-Origin', '*')
      res.status(201).json(rows);
      mssql.close();
    }).catch((err: any) => {
      console.warn("error");
      res.status(500).send({ message: `${err}`})
      mssql.close();
    });
  }
    /**
   * @method post
   * @param req 
   * @param res 
   */
  async IngresarCliente(req: Request, res: Response){
  
   let { idCliente,nombre,direccionExacta,correo,telefono,nombreDistrito,nombreCanton,nombreProvincia } = req.body;
    
    new mssql.ConnectionPool(config).connect().then((pool:any) => {
      return pool.request()
      .input('idCliente',mssql.CHAR(11),idCliente)
      .input('nombre',mssql.VARCHAR(100),nombre)
      .input('direccionExacta',mssql.VARCHAR(200),direccionExacta)
      .input('correo',mssql.VARCHAR(50),correo)
      .input('telefono',mssql.VARCHAR(17),telefono)
      .input('nombreDistrito',mssql.VARCHAR(30),nombreDistrito)
      .input('nombreCanton',mssql.VARCHAR(30),nombreCanton)
      .input('nombreProvincia',mssql.VARCHAR(30),nombreProvincia)
      .execute('IngresarCliente')
      }).then((result: { recordset: any; }) => {
        let rows = result.recordset
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.status(201).json(rows);
        mssql.close();
      }).catch((err: any) => {
        res.status(500).send({ message: `${err}`})
        mssql.close();
      });
  }
    /**
   * @method post
   * @param req 
   * @param res 
   */
   
  async CrearNota(req: Request, res: Response){
    let {idFacturaC} = req.params;
    let { monto,tipo,descripcion,fecha } = req.body; 
    new mssql.ConnectionPool(config).connect().then((pool:any) => {
      return pool.request()
      .input('monto', mssql.float,monto )
      .input('idFacturaC', mssql.INT,idFacturaC )
      .input('tipo', mssql.tTipo,tipo )
      .input('descripcion', mssql.VARCHAR(200),descripcion )
      .input('fecha', mssql.Date, fecha )
      .execute('CrearNota')
      }).then((result: { recordset: any; }) => {
        let rows = result.recordset; 
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.status(200).json(rows);
        mssql.close();
      }).catch((err: any) => {
        res.status(500).send({ message: `${err}`})
        mssql.close();
      });
  }
  /**
   * @method get
   * @param req 
   * @param res 
   */
  async getProvincias(req: Request, res: Response){
    new mssql.ConnectionPool(config).connect().then((pool:any) => {
      return pool.request().execute('getProvincias')
      }).then((result: { recordset: any; }) => {
        let rows = result.recordset
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.status(201).json(rows);
        mssql.close();
      }).catch((err: any) => {
        res.status(500).send({ message: `${err}`})
        mssql.close();
      });
  }
  /**
   * @method get
   * @param req 
   * @param res 
   */
  async getDistritoSegunCanton(req: Request, res: Response){
    let { nombreCanton } = req.params; 
    new mssql.ConnectionPool(config).connect().then((pool:any) => {
      return pool.request()
      .input('nombreCanton', mssql.VARCHAR(30), nombreCanton)
      .execute('getDistritoSegunCanton')
      }).then((result: { recordset: any; }) => {
        let rows = result.recordset; 
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.status(200).json(rows);
        mssql.close();
      }).catch((err: any) => {
        res.status(500).send({ message: `${err}`})
        mssql.close();
      });
  }
  /**
   * @method get
   * @param req 
   * @param res 
   */
   async getCantonSegunProvincia(req: Request, res: Response){
    let { nombreProvincia } = req.params; 
    new mssql.ConnectionPool(config).connect().then((pool:any) => {
      return pool.request()
      .input('nombreProvincia', mssql.VARCHAR(30), nombreProvincia)
      .execute('getCantonSegunProvincia')
      }).then((result: { recordset: any; }) => {
        let rows = result.recordset; 
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.status(200).json(rows);
        mssql.close();
      }).catch((err: any) => {
        res.status(500).send({ message: `${err}`})
        mssql.close();
      });
  }
  //routes that consult in the FrontEnd
  routes() { 
    this.router.post("/Cliente/", this.IngresarCliente); 
    this.router.post('/nota/', this.CrearNota); 
    this.router.get("/:nombreCanton:", this.getDistritoSegunCanton);
    this.router.get("/:nombreProvincia", this.getCantonSegunProvincia);
    this.router.get("/", this.getProvincias); 
    this.router.post("/Sucursal/",this.CrearSucursal);
    this.router.post('/Abono/',this.InsertarAbono);
    this.router.post('/FacturaD/',this.CrearFacturaContado);
  }
}

const surveyedRouter = new SurveyedRouter();
surveyedRouter.routes();

export default surveyedRouter.router;
//{'idCliente':'2-0818-0362','Nombre':'Victor','direccionExacta':'xxxxxxxxxxxxxx','correo':'lalaaaa21@gmail.com','telefono':'8975-1234','Distrito':'Orosi','Canton':'Paraiso','Provincia':'Cartago'}