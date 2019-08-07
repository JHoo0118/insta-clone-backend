import "./env";
import { GraphQLServer } from "graphql-yoga";
import loggar from "morgan";
import schema from "./schema";

const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({ schema });
server.express.use(loggar("dev"));

server.start({ port: PORT }, () => console.log(`Server running on port http://localhost:${PORT}`));