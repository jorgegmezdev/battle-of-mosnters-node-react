import app from '../../app';
import request from 'supertest';
import { StatusCodes } from 'http-status-codes';
import { MonsterService } from '../../services/monster.service';
import { Monster } from '../../models';

const server = app.listen();

beforeAll(() => jest.useFakeTimers());
afterAll(() => server.close());

const mockMOnsterA = Monster.fromJson({
  id: 1,
  name: 'Monster A',
  attack: 100,
  defense: 50,
  hp: 200,
  speed: 75,
  imageUrl: 'image-example'
});

const mockMOnsterB = Monster.fromJson({
  id: 2,
  name: 'Monster B',
  attack: 80,
  defense: 60,
  hp: 180,
  speed: 90,
  imageUrl: 'image-example'
});

const mockBattleWinnerA = {
  id: 1,
  monsterA: mockMOnsterA,
  monsterb: mockMOnsterB,
  winner: mockMOnsterA,
}

const mockBattleWinnerB = {
  id: 1,
  monsterA: mockMOnsterA,
  monsterb: mockMOnsterB,
  winner: mockMOnsterB,
}

describe('BattleController', () => {
  describe('List', () => {
    test('should list all battles', async () => {
      const response = await request(server).get('/battle');
      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body.length).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Battle', () => {
    test('should fail when trying a battle of monsters with an undefined monster', async () => {
      jest.spyOn(MonsterService, 'findById').mockResolvedValueOnce(undefined);
      jest.spyOn(MonsterService, 'findById').mockResolvedValueOnce(mockMOnsterB);
      const response = await request(server).post('/battle').send({ monsterAId: 1, monsterBId: 2 });
      expect(response.statusCode).toBe(404);
    });

    test('should fail when trying a battle of monsters with an inexistent monster', async () => {
      jest.spyOn(MonsterService, 'findById').mockResolvedValueOnce(null);
      jest.spyOn(MonsterService, 'findById').mockResolvedValueOnce(mockMOnsterB);
      const response = await request(server).post('/battle').send({ monsterAId: 1, monsterBId: 2 });
      expect(response.statusCode).toBe(404);
    });

    test('should insert a battle of monsters successfully with monster 1 winning', async () => {
      jest.spyOn(MonsterService, 'findById').mockResolvedValueOnce(mockMOnsterA);
      jest.spyOn(MonsterService, 'findById').mockResolvedValueOnce(mockMOnsterB);
      jest.fn().mockResolvedValueOnce(mockBattleWinnerA);
      const response = await request(server).post('/battle').send({ monsterAId: 1, monsterBId: 2 });
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('winner', mockMOnsterA);
    });

    test('should insert a battle of monsters successfully with monster 2 winning', async () => {
      const mockMOnsterB = Monster.fromJson({
        id: 2,
        name: 'Monster B',
        attack: 200,
        defense: 60,
        hp: 180,
        speed: 90,
        imageUrl: 'image-example'
      });

      jest.spyOn(MonsterService, 'findById').mockResolvedValueOnce(mockMOnsterA);
      jest.spyOn(MonsterService, 'findById').mockResolvedValueOnce(mockMOnsterB);
      jest.fn().mockResolvedValueOnce(mockBattleWinnerB);
      const response = await request(server).post('/battle').send({ monsterAId: 1, monsterBId: 2 });
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('winner', mockMOnsterB);
    });

    test('should insert a battle of monsters successfully using attack monster 1 winning', async () => {
      const mockMOnsterA = Monster.fromJson({
        id: 2,
        name: 'Monster B',
        attack: 100,
        defense: 50,
        hp: 200,
        speed: 75,
        imageUrl: 'image-example'
      });
      const mockMOnsterB = Monster.fromJson({
        id: 2,
        name: 'Monster B',
        attack: 80,
        defense: 60,
        hp: 180,
        speed: 75,
        imageUrl: 'image-example'
      });

      jest.spyOn(MonsterService, 'findById').mockResolvedValueOnce(mockMOnsterA);
      jest.spyOn(MonsterService, 'findById').mockResolvedValueOnce(mockMOnsterB);
      jest.fn().mockResolvedValueOnce(mockBattleWinnerA);
      const response = await request(server).post('/battle').send({ monsterAId: 1, monsterBId: 2 });
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('winner', mockMOnsterA);
    });

    test('should insert a battle of monsters successfully using attack monster 2 winning', async () => {
      const mockMOnsterB = Monster.fromJson({
        id: 2,
        name: 'Monster B',
        attack: 200,
        defense: 60,
        hp: 180,
        speed: 500,
        imageUrl: 'image-example'
      });

      jest.spyOn(MonsterService, 'findById').mockResolvedValueOnce(mockMOnsterA);
      jest.spyOn(MonsterService, 'findById').mockResolvedValueOnce(mockMOnsterB);
      jest.fn().mockResolvedValueOnce(mockBattleWinnerB);
      const response = await request(server).post('/battle').send({ monsterAId: 1, monsterBId: 2 });
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('winner', mockMOnsterB);
    });

    test('should send valid identifiers', async () => {
      const response = await request(server).post('/battle').send({ monsterAId: 'NaN', monsterBId: 2 });
      expect(response.statusCode).toBe(400);
    })
  });
});
