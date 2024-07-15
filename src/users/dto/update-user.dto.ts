export class UpdateUserDto {
  name?: string;
  email?: string;
  readonly profileId?: number;
  readonly postIds?: number[];
  readonly projectIds?: number[];
}
