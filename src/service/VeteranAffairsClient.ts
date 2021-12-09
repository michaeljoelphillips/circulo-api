import axios from 'axios';

type VeteranStatus = 'Confirmed' | 'Not Confirmed';

export type Veteran = {
  ssn: string;
  birth_date: string;
  first_name: string;
  middle_name: string | null;
  last_name: string;
};

class VeteranAffairsClient {
  readonly baseUrl: string;

  readonly key: string;

  constructor(baseUrl: string, key: string) {
    this.baseUrl = baseUrl;
    this.key = key;
  }

  async confirmStatus(veteran: Veteran): Promise<VeteranStatus> {
    try {
      const response = await axios({
        method: 'POST',
        responseType: 'json',
        url: `${this.baseUrl}/services/veteran_confirmation/v0/status`,
        headers: { apikey: this.key },
        data: veteran,
      });

      return response.data.veteran_status === 'confirmed'
        ? 'Confirmed'
        : 'Not Confirmed';
    } catch (e: unknown) {
      throw new Error('Could not confirm the status for the given veteran');
    }
  }
}

export default VeteranAffairsClient;
