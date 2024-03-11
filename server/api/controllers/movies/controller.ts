import setResponse from "../../response/response.helper";
import express from "express";
import { RESPONSES } from "../../constant/response";
import movieHelper from "../../helpers/movie.helper";

export class MovieController {
  addMovie = async (req: express.Request, res: express.Response) => {
    try {
      const addMovie = await movieHelper.addMovie(req.body);
      if (addMovie.error) {
        return setResponse.error(res, RESPONSES.BADREQUEST, {
          message: addMovie.message,
          error: true,
        });
      }
      return setResponse.success(res, RESPONSES.SUCCESS, {
        error: false,
        message: "Movie Added",
      });
    } catch (error: any) {
      return setResponse.error(res, RESPONSES.BADREQUEST, {
        message: error.message,
        error: true,
      });
    }
  };

  getAll = async (req: express.Request, res: express.Response) => {
    try {
      const limit = parseInt(req.headers.limit as string);
      const offset = parseInt(req.headers.offset as string);
      const getAll = await movieHelper.getAll(limit, offset);
      if (!getAll.error) {
        return setResponse.success(res, RESPONSES.SUCCESS, {
          error: false,
          data: getAll.data,
        });
      }
      return setResponse.error(res, RESPONSES.BADREQUEST, {
        message: getAll.message,
        error: true,
      });
    } catch (error: any) {
      return setResponse.error(res, RESPONSES.BADREQUEST, {
        message: error.message,
        error: true,
      });
    }
  };

  search = async (req: express.Request, res: express.Response) => {
    try {
      const getQueryMovie = await movieHelper.search(req.query.q as string);
      if (!getQueryMovie.error) {
        return setResponse.success(res, RESPONSES.SUCCESS, {
          error: false,
          data: getQueryMovie.data,
        });
      }
      return setResponse.error(res, RESPONSES.BADREQUEST, {
        message: getQueryMovie.message,
        error: true,
      });
    } catch (error: any) {
      return setResponse.error(res, RESPONSES.BADREQUEST, {
        message: error.message,
        error: true,
      });
    }
  };

  updateMovie = async (req: express.Request, res: express.Response) => {
    try {
      const updateMovie = await movieHelper.updateMovie(
        req.params.id,
        req.body
      );
      if (updateMovie.error) {
        return setResponse.error(res, RESPONSES.BADREQUEST, {
          message: updateMovie.message,
          error: true,
        });
      }
      return setResponse.success(res, RESPONSES.SUCCESS, {
        error: false,
        message: "Movie Updated!",
      });
    } catch (error: any) {
      return setResponse.error(res, RESPONSES.BADREQUEST, {
        message: error.message,
        error: true,
      });
    }
  };

  deleteMovie = async (req: express.Request, res: express.Response) => {
    try {
      const deleteMovie = await movieHelper.deleteMovie(req.params.id);
      if (deleteMovie.error) {
        return setResponse.error(res, RESPONSES.BADREQUEST, {
          message: deleteMovie.message,
          error: true,
        });
      }
      return setResponse.success(res, RESPONSES.SUCCESS, {
        error: false,
        message: "Movie Deleted!",
      });
    } catch (error: any) {
      return setResponse.error(res, RESPONSES.BADREQUEST, {
        message: error.message,
        error: true,
      });
    }
  };
}

export default new MovieController();
