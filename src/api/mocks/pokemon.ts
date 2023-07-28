import { rest } from 'msw';
import { API_HOST } from '../../config.json';

export const getPokemon = rest.get(`${API_HOST}/pokemon/:id`, (req, res, ctx) =>
  res(
    req.params.id !== 'failing-test-pokemon'
      ? ctx.json({
          id: req.params.id,
          name: req.params.id,
          sprites: {
            front_default: '',
            back_default: '',
          },
          types: [
            { type: { name: 'test-type-1' } },
            { type: { name: 'test-type-2' } },
            { type: { name: 'test-type-3' } },
          ],
          weight: 100,
          height: 120,
          abilities: [
            { ability: { name: 'test-ability-1' } },
            { ability: { name: 'test-ability-2' } },
          ],
        })
      : ctx.status(404)
  )
);
