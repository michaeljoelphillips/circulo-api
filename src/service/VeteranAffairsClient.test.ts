import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import VeteranAffairsClient from './VeteranAffairsClient';

const mock = new MockAdapter(axios);

const CONFIRMED_VETERAN = {
  ssn: '796-13-0115',
  first_name: 'Tamara',
  middle_name: null,
  last_name: 'Ellis',
  birth_date: '1967-06-19',
};

const UNCONFIRMED_VETERAN = {
  ssn: '796-12-1200',
  first_name: 'Greg',
  middle_name: null,
  last_name: 'Anderson',
  birth_date: '1933-04-05',
};

const NULL_VETERAN = {
  ssn: '000-00-0000',
  first_name: 'Test',
  middle_name: null,
  last_name: 'User',
  birth_date: '1990-01-01',
};

describe('Veteran Affairs API Client', () => {
  describe('confirmStatus', () => {
    it('returns the correct VeteranStatus', async () => {
      const client = new VeteranAffairsClient('https://sandbox-api.va.gov', 'test-api-key');

      mock
        .onPost()
        .replyOnce(200, {
          veteran_status: 'confirmed',
        });

      mock
        .onPost()
        .replyOnce(200, {
          veteran_status: 'not confirmed',
        });

      expect(await client.confirmStatus(CONFIRMED_VETERAN)).toEqual('Confirmed');
      expect(await client.confirmStatus(UNCONFIRMED_VETERAN)).toEqual('Not Confirmed');
    });
  });

  it('throws an error when there is a problem with the request', () => {
    const client = new VeteranAffairsClient('https://sandbox-api.va.gov', 'test-api-key');

    mock.onPost().replyOnce(401);

    expect(client.confirmStatus(NULL_VETERAN)).rejects.toEqual(new Error('Could not confirm the status for the given veteran'));
  });
});
