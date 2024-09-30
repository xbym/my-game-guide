import FirecrawlApp, { ScrapeResponse } from '@mendable/firecrawl-js';
import { z } from 'zod';

const app = new FirecrawlApp({apiKey: process.env.FIRECRAWL_API_KEY});

const ScrapeDataSchema = z.object({
  markdown: z.string(),
  metadata: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
  }).catchall(z.unknown()),
});

type ScrapeData = z.infer<typeof ScrapeDataSchema>;

export async function crawlGuide(url: string): Promise<ScrapeData | null> {
  try {
    console.log('Attempting to crawl:', url);
    const response = await app.scrapeUrl(url, {
      formats: ['markdown'],
    });

    console.log('Raw response:', JSON.stringify(response, null, 2));

    if ('success' in response && response.success && 'markdown' in response) {
      const parsedData = ScrapeDataSchema.safeParse({
        markdown: response.markdown,
        metadata: response.metadata || {}
      });
      if (parsedData.success) {
        return parsedData.data;
      } else {
        console.error('Failed to parse scraped data:', parsedData.error);
        return null;
      }
    } else {
      console.error('Unexpected response structure:', response);
      throw new Error('Failed to crawl the guide: Unexpected response structure');
    }
  } catch (error) {
    console.error('Error crawling guide:', error);
    throw error;
  }
}