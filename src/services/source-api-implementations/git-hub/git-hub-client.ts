import { HttpClient } from "../../http-client";
import { AxiosInstance } from "axios";
import { BranchDto } from "@/types/dto/branch-dto";
import { ContentDto } from "@/types/dto/content-dto";
import { ContentDataDto } from "@/types/dto/content-data-dto";
import { RefDto } from '@/types/dto/ref-dto';
import { CommitDto } from '@/types/dto/commit-dto';
import { FileDto } from '@/types/dto/file-dto';

/**
 * Provides methods for GitHub API features calling.
 */
export class GitHubClient {
  private readonly http: AxiosInstance;
  private readonly repoPath: string;

  constructor(username: string, personalToken: string, repo: string) {
    const headers = {
      "Authorization": `token ${personalToken}`,
      "Accept": "application/vnd.github.v3+json",
      "Content-Type": "application/json"
    };
    this.http = HttpClient.create("https://api.github.com", headers);
    this.repoPath = `repos/${username}/${repo}`;
  }

  async branches(): Promise<BranchDto[]> {
    const resp = await this.http.get(`${this.repoPath}/branches`);
    return resp.data;
  }

  async branch(branchName: string): Promise<BranchDto> {
    const resp = await this.http.get(`${this.repoPath}/branches/${branchName}`);
    return resp.data;
  }

  async contents(branchName: string): Promise<ContentDto[]> {
    const resp = await this.http.get(`${this.repoPath}/contents?ref=${branchName}`);
    return resp.data;
  }

  async content(branchName: string, fileName: string): Promise<ContentDto & ContentDataDto> {
    const resp = await this.http.get(`${this.repoPath}/contents/${fileName}?ref=${branchName}`);
    return resp.data;
  }

  async ref(refName: string): Promise<RefDto> {
    const resp = await this.http.get(`${this.repoPath}/git/refs/heads/${refName}`);
    return resp.data;
  }

  async matchingRefs(text: string): Promise<RefDto[]> {
    const resp = await this.http.get(`${this.repoPath}/git/matching-refs/heads/${text}`);
    return resp.data;
  }

  async createRef(refName: string, parentSha: string): Promise<RefDto> {
    const request = {
      ref: `refs/heads/${refName}`,
      sha: parentSha
    };
    const resp = await this.http.post(`${this.repoPath}/git/refs`, request);
    return resp.data;
  }

  async createRefHead(refName: string, newCommitSha: string): Promise<RefDto> {
    const request = {
      sha: newCommitSha
    };
    const resp = await this.http.post(`${this.repoPath}/git/refs/heads/${refName}`, request);
    return resp.data;
  }

  async deleteRef(refName: string): Promise<void> {
    await this.http.delete(`${this.repoPath}/git/refs/heads/${refName}`);
  }

  async getCommit(Sha: string): Promise<CommitDto> {
    const resp = await this.http.get(`${this.repoPath}/git/commits/${Sha}`);
    return resp.data;
  }

  async createTree(shaBaseTree: string, filePath: string, content: string): Promise<CommitDto> {
    const request = {
      'base_tree': shaBaseTree,
      tree: [
        {
          path: filePath,
          mode: "100644",
          type: "blob",
          content: content
        }
      ]
    };

    const resp = await this.http.post(`${this.repoPath}/git/trees`, request);
    return resp.data;
  }

  async createCommit(parentsSha: string[], treeSha: string, message: string): Promise<CommitDto> {
    const request = {
      parents: parentsSha,
      tree: treeSha,
      message
    };

    const resp = await this.http.post(`${this.repoPath}/git/commits`, request);
    return resp.data;
  }

  async createFile(filePath: string, branchName: string, content: string): Promise<FileDto> {
    const request = {
      message: `Create file [${filePath}]`,
      branch: branchName,
      content
    };

    const resp = await this.http.put(`${this.repoPath}/contents/${filePath}`, request);
    return resp.data;
  }

  async updateFile(filePath: string, branchName: string, sha: string, content: string): Promise<FileDto> {
    const request = {
      message: `Update file [${filePath}]`,
      sha,
      branch: branchName,
      content
    };

    const resp = await this.http.put(`${this.repoPath}/contents/${filePath}`, request);
    return resp.data;
  }

  async deleteFile(filePath: string, branchName: string, sha: string): Promise<void> {
    const config = {
      data: {
        message: `Delete file [${filePath}]`,
        sha,
        branch: branchName
      }
    };

    await this.http.delete(`${this.repoPath}/contents/${filePath}`, config);
  }
}
