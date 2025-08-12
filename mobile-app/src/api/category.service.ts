import { AxiosResponse } from 'axios';
import { CrudService } from './crud.service';
import { Category, CategoryHierarchyRequest, CategoryList } from '@ui/shared-models';

export class CategoryService {
  private crudService: CrudService;

  constructor() {
    this.crudService = new CrudService();
  }

  /**
   * Get category by ID
   */
  async findById(id: number): Promise<Category | null> {
    try {
      const response: AxiosResponse<Category> = await this.crudService.get(
        `/public/category/id/${id}`
      );
      return response.data;
    } catch (error) {
      console.error('[CategoryService] Find category by ID failed', error);
      return null;
    }
  }

/**
   * Get category hierarchy from root.
   * Supports filters like FEATURED_CATEGORIES and VISIBLE_ONLY.
   * Endpoint example: /public/category/
   */
  async getCategoryHierarchy(payload: CategoryHierarchyRequest): Promise<CategoryList | null> {
    try {
      const response: AxiosResponse<CategoryList> = await this.crudService.post(
        '/public/category/',
        payload
      );
      return response.data;
    } catch (error) {
      console.error('[CategoryService] Get category hierarchy failed', error);
      return null;
    }
  }
}
