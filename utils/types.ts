// Interface to defining our object of response functions
export interface ResponseFuncs {
  GET?: Function;
  POST?: Function;
  PUT?: Function;
  DELETE?: Function;
}

// Interface to define our User model on the frontend
export interface UserResource {
  _id?: number;
  name: string;
  email: string;
  password: boolean;
}
