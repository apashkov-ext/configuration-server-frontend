import { Component, Vue, Prop } from 'vue-property-decorator';
import OptionGroupView from './option-group-view/option-group-view.vue';
import ConfigPreview from './config-preview/config-preview.vue';
import { Inject } from 'di-corate';
import { BusyOverlay } from '@/core/busy-overlay';
import { FileUploader } from './file-uploader';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Environment, OptionGroup } from '@/domain';

@Component({
  components: { ConfigPreview, OptionGroupView }
})
export class ConfigEditor extends Vue {
  private unsubscribe = new Subject();

  @Prop() environment!: Environment;
  @Prop() projectId!: string;
  @Inject(BusyOverlay) private readonly busy!: BusyOverlay;
  @Inject(FileUploader) private readonly uploader!: FileUploader;

  get preview() {
    return this.getPreview(this.environment.optionGroup);
  }

  private getPreview(input: OptionGroup): string {
    const truncated = input.truncate();
    return JSON.stringify(truncated, null, '\t');
  }

  download() {
    this.downloadString(this.preview, 'application/json', `config.${this.environment.name}.json`);
  }

  uploadFile(files: FileList) {
    if (!files.length) {
      return;
    }

    this.busy.showBusy();
    this.uploader.upload(files[0], this.projectId, this.environment.name);
  }

  /**
   * Example: // downloadString("a,b,c\n1,2,3", "text/csv", "myCSV.csv")
   * @param content String to download.
   * @param fileType Mime-type.
   * @param fileName Filename.
   */
  private downloadString(content: string, fileType: string, fileName: string) {
    const blob = new Blob([content], { type: fileType });
    const a = document.createElement('a');
    a.download = fileName;
    a.href = URL.createObjectURL(blob);
    a.dataset.downloadurl = [fileType, a.download, a.href].join(':');
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1500);
  }

  created() {
    this.uploader.uploaded.pipe(takeUntil(this.unsubscribe)).subscribe(() => {
      (this.$refs.fileInput as any).value = null;
      this.$emit('uploaded');
    });
  }

  beforeDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
