// tslint:disable
import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity({ name: 'githubprofiles' })
export class GitHubProfileEntity {
  @ObjectIdColumn() _id: ObjectID;
  @Column() id: number;
  @Column() login: string;
  @Column() node_id: string;
  @Column() avatar_url: string;
  @Column() gravatar_id: string;
  @Column() url: string;
  @Column() html_url: string;
  @Column() followers_url: string;
  @Column() following_url: string;
  @Column() gists_url: string;
  @Column() starred_url: string;
  @Column() subscriptions_url: string;
  @Column() organizations_url: string;
  @Column() repos_url: string;
  @Column() events_url: string;
  @Column() received_events_url: string;
  @Column() type: string;
  @Column() site_admin: boolean;
  @Column() name: string;
  @Column() company: string;
  @Column() blog: string;
  @Column() location: string;
  @Column() email: string;
  @Column() hireable: string;
  @Column() bio: string;
  @Column() public_repos: number;
  @Column() public_gists: number;
  @Column() followers: number;
  @Column() following: number;
  @Column() created_at: Date;
  @Column() updated_at: Date;
}
