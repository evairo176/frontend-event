interface ICreateBackendBanner {
  title: string;
  isShow: boolean;
  image: string;
}
interface IUpdateBackendBanner {
  title?: string;
  isShow?: boolean;
  image?: string;
}

interface ICreateFormBanner {
  title: string;
  isShow: string;
  image: string | FileList;
}

interface IUpdateFormBanner {
  title?: string;
  isShow?: string;
  image?: string | FileList;
}

export {
  ICreateBackendBanner,
  IUpdateBackendBanner,
  ICreateFormBanner,
  IUpdateFormBanner,
};
