const request = require('supertest');
const app = require('../src/app');
const fs = require('fs');
const path = require('path');
const config = require('config');

const { uploadDir, profileDir } = config;
const profileFolder = path.join('.', uploadDir, profileDir);

describe('Profile Image', () => {
  const copyFile = () => {
    const filePath = path.join('.', '__tests__', 'resources', 'test-png.png');
    const storedFilename = 'test-file';
    const targetPath = path.join(profileFolder, storedFilename);
    fs.copyFileSync(filePath, targetPath);
    return storedFilename;
  };
  it('return 404 when file not found', async () => {
    const response = await request(app).get('/images/123456');
    expect(response.status).toBe(404);
  });

  it('returns 200 when file exist', async () => {
    const storedFilename = copyFile();
    const response = await request(app).get(`/images/${storedFilename}`);
    expect(response.status).toBe(200);
  });

  it('returns cache for 1 year in response', async () => {
    const storedFilename = copyFile();
    const response = await request(app).get(`/images/${storedFilename}`);
    const oneYearInSeconds = 365 * 24 * 60 * 60;
    expect(response.header['cache-control']).toContain(`max-age=${oneYearInSeconds}`);
  });
});
