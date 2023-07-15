import { parser } from './parser.route';
import { page404 } from './page404.route';

const routes = [
    ...parser,
    ...page404
];

export { routes };