import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AuctionContext } from "../context/AuctionContextProvider";
import { SocketContext } from "../context/SocketContext";
import AuctionDetailsPageData from "../components/AuctionDetailsPageData";

const AuctionDetailsPage = () => {
  const {
    activeAuction,
    setActiveAuction,
    highestBid,
    setHighestBid,
  } = useContext(AuctionContext);
  const { sendMessage } = useContext(SocketContext);
  const [showErrorMessage, setShowErrorMessage] = useState(0);
  const [bid, setBid] = useState(0);
  const [acceptedBid, setAcceptedBid] = useState(0);
  const [bool, setBool] = useState(false);
  let { id } = useParams();

  const getAuction = async () => {
    let auction = await fetch("/api/v1/auctions/" + id);
    auction = await auction.json();
    await setActiveAuction(auction);
    setBool(true);
  };

  useEffect(() => {
    if (activeAuction == null) {
      getAuction();
    } else {
      setBool(true);
    }
  }, []);

  useEffect(() => {
    if (activeAuction !== null) {
      setHighestBid(
        activeAuction.highestBid !== null
          ? activeAuction.highestBid
          : activeAuction.price
      );

      sendMessage({
        action: "join-room",
        payload: { id: activeAuction.id },
      });

      return () => {
        sendMessage({
          action: "leave-room",
          payload: { id: activeAuction.id },
        });
      };
    }
  }, [activeAuction]);

  useEffect(() => {
    console.log(highestBid);
  }, []);

  const postBid = async () => {
    let response = await fetch(`/api/v1/auctions/${activeAuction.id}/${bid}`, {
      method: "POST",
    });
    if (response.status === 400) {
      //Too low
      setShowErrorMessage(1);
    } else if (response.status === 405) {
      //No bid
      setShowErrorMessage(2);
    } else if (response.status === 204) {
      //No error
      setShowErrorMessage(0);
    }
  };

  return (
    <div>
      {!bool ? (
        <div>
          <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAwJCRcVExgXFhcaGBgbHR8fHx0dHR8dHx0gIh0lJSAgIB8mLT0xJik4Kh8gMkkzOD5AREVFJTBMUktCUjxDRUEBDQ4OExETHxUVJUEnJydBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQkFBQUVBQUFBQUFBQUFBRUFFQUFBQf/AABEIAMkA+gMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAACAQMEBQYHAP/EAEwQAAEDAgMFBAYECQkIAwAAAAEAAgMEEQUSIQYTMUFRByJhcRQyUoGRsSOSocEVMzVCc3SywtE2Q1NygpOis/AXJDRUYtLh8SVko//EABkBAAMBAQEAAAAAAAAAAAAAAAABAgMEBf/EACARAQEAAgIDAQEBAQAAAAAAAAABAhEDIRIxQQRRFBP/2gAMAwEAAhEDEQA/AOfOqH+2/wCsf4oPSH+2/wCs7+KVwQqiEal/tv8ArFAap/8ASP8ArH+KQsQPGh8igNBXbNV0FNHUyH6KTJYiUk98Xbcck3jWztdRuiZMSXTEhgZIXkkEaf4guxDDRVYRFCfzqeK3g4Na5p+ICrtp23xbCb+3MfgwFSbDjs4xTd58zb2vk3zs3l0v71W4RstX1Yk3Vxunljw+QscHAaiy646Q/hprbnL6ETa+l98NbdVixXyx7TuhZI5sUkzS9gNmuO4BuRz4IDPYlsViNNC+aUgMZa9piTqQBp5lJVbE4jC+JryLzPyMtMT3spdr00aVoe1PEZmVUELZHtifGC9gNmuO95jnwC6FieFmeWleHBu4l3hBF8wyObYdPWQHGJtk69lVHSuI3srXPb9KbWbe9zy4JRsliHpfolxvhHvbb42y5rcet10bFP5RUH6CX5ORM/lI79SH+agOcUOytfLUTwM/GQFoeHSkDvAluU8wbJrBMCra5zxBezDZ73PLWNPS/M+S7ZBhoZWTVA/nY42u84y/X4OA9yy2wndwmoI0O9qDfxA/8IDAY5s3XUDQ+a5jJtnZI5zb8gRoQomD4fU1s26gN3hpf3pC0WBAOvvC2GL4jU/gLcTUMzQ2KIGZz2Fujm2da99fvVf2W/lJ36u/9tiAh0+x+ISSyxNDc8JaH/TG3fbmFjz0Kj4VsvX1YkdDYiOR0TrzFveba9uo1XZaDDDFU1UxcCJ3RkC2rckYbr14LO9nf4qu/XZvk1Ac/l2Tr21LKY23sjHPb9MbZW8bnqpE+weKMaXZM9hezZru9wPFaDBMPq6fHYWVk+/cYJXNOZzrNJOmoFtQtu2F8VTU1EkhMBjjysGZxaWZs5ygc7jh0QHGsF2bra6N0lObta7Ic0pacwAJ094TWL4PVUUjY6g2c9pc3LIXaA21XR+zOYPp6t7dGuq5HDyLWkLB7VYdVwVLG1k+/eWFzDmc7K3P6uoFuCRwWFbJ19XA2aGxjdmsTMWnRxBuPMKHjWC1lEW+kNc0O0a5smZpPS4Oh810rY6B8mAiON2V72zta65FnF7wDcajVV3aTNu8NpoJMz5M8V5LEtuxpDiXnmddOKZM8NgcUtezP79UktBVsqRSuZJ6QSAGB181xcEG9iOOvgu3V9HLIaUxvyCOVr36kZmZHAt046kceizDqqOXaaMNveKmc1xII71ydL8dHcUHtlZ9gcTZGX915AuWMlcX+64AJ96ywnf7T/rOXbMLlccWr2kktEdLYX0F2yXsFyHGGgVtUBynl/bKVPHtHEz/AGnfWKEzv9p31ikzIbqZV2D3z/ad9Ypd+/2nfWKAJUEr3cV6ycypMq1ZG7oXjQ+SfyIQxBO3uxP0emwok2bI6GJ3k+ncB/iyqFthVNixPCnvIa0SSgk8BmDW6/ELkklRI5rWulkc1pGUF7iGkDQgX0skmmkltvZHyWvbO5zrX42uVJ7d6NBJ+ExUWG69FMd76596HWt5c1zaOpbLtSHsIc3f2BHA5Ycpt7wVlvwpU7vd+kz7u1sm9flt0tfgobXFhBY4tcOBaS0jyIQbddq4/wB/pv0Q/wA1b7aCVzajDw1xAdUkOAJFxuZDY9RouDVFQ+QgyPfIQLAuc5xAvfQk6Jx+IzuIJmmJabtJkecp4XGuh1T0HYcU/lFQfoJfk5Gz+Ujv1If5q40a2YvDzNKXgWDt47MAeIBvcI21suYyb6XPa2bePzW6XveyQd32exPfGqjce9BUys/s3zN+w29yzvZ9K2XDqmFpGcSzAjpnHdPlx+C5RHWTNc4smlaXG7iHuBcepIOpQ0tVLC/PFI+N3tMcWk+ZHFAdd2gglj2cfHObzMhjD9c3ezt0J58lkeym/wCEpL/8u79tiz2HwVNY90YllcHm7y57y0+LtdToPgtpR7ChkZMcr2zFtg9rnM93dPBZZ8uOF1V48eWU3G1weRxr8RBc4hr4MoJJAvCCbDkqns6H0Vd+uzfJqpsG2TewPdUSTZ3O4tmkBIAsCSDqm6/ZpsTXbiWaIkknLK+xPMnXU+Kn/RhvSv8Alkc2f2dqaLGYPSZhMZIpspDnusG20OYf9S1uHuP4XrRc23NMbcv5xcWrpZ45e9NKXNFmu3jyQDxsb6KL+EZw4uE82Y2BcJH3IHAE35XK3nc2yvV1XYOzsWjrh/8Adm/dXPdpsAqKKVnpMolMgeWuD3uIDXDQ5+HrDgqSjrJWkhssrcxzHLI9tyeJNjxT88r3kF73vtoM73Pt1tc6cEqeLqWydK6XZ/dM9d7Khrbmwu57wNeWqDbxm6wRkchGcGBnHi5pF7deBXMYqqVgsyWVjfZbI9oGtzoCgqHuktvHvkt7b3Ot5XOiWz8a7TtESH4da4/3tg//ACkVXiVSyLaOlLiG56VzATpdxe6wv7rLlpqZXWzTTHKbtvI85T1GuhXpnF5vI50jrWu9znEC99CTojyhzCu3UdA+OvrKh9hFKyANNx/Nh+a/S1wuMYhO2WpqJG6tfNI5p6gvNivSV872bt9RM+O3qOleW+Vr6hMFlraJW7VjjoDghKdypLWSVYHKjyeKRLZBaRTxXrIo2XdZTDTgLW3Tn0g3ShPSxgcEyRZGxeiOCUHgvDVeAQbznIANNU7YoCEAyQkavOvdLaxTKvDVLZIEbylVYkSOSJLJKdH2KpA2mzc3G58uS2cCyOy9a1tMxtrmw4LUUeIxyOLRo4cl5XJ3lXdOsYluVNiPAqwxDEY4WXebLPVGKbwHLG+3G9lnJTwY/aClzDMOSy62WJTBzT8lj5hZ5HivT4L1quT9E72WM6hThwVfEdR5qeHLXJng9l4JbLwcvcVDR5qUhIWpeSDG1qNBZHbRTVkIQluqW6S6E0oajyjqgCW5QAQU7ibj/wBqbuzlT+YCwuNB1TMrjY66fYq8tsbjqIT7DgmS1TBHm4piWKy0iLDLWpMvVO5UNuSAFCbp9rNELhco2NIbuKAlOzHkm7KiICnDqgy6p2OyVVDSRqdcEgClTZ4S+WOnjMbQc7eJ6jl1VphMlQ5+aVoZY+8+HVLsnK19I1pt3bj4FX5jAsBzK8zky7sehjOpVRjUDpaljeIa0uA6u5XVXi0tXGWhgBbb3A9OKv66YNqBe2ospT4WuF3D4qcctHYxLKCSRpkeMtxwWYxKnIksPJdDxOYNaQOKxVWLuzHlcrp4c7tjy4dKyOnA1JubqSG6JQ0hovxRjgum3bnmOjQC9axR24JbJbVIGyUN4pUYSaSAARr1kQKQ0bHFeASkLxCEkRBISl3ngmQ5Hd65Xt5cKQ+K5JtbXgmhEXHQcFUsZ5Snd6ALdFAkkLnE8uSdqGWB+CjNKrGRGVOkgBCy17oXjknI2GydSRz03dK9AQiDZiUIQ1OyaIAVUJ4tsvMPFAeKVh1IRfRy9lJ1SEoizggLSoW1ux1ZYuYTzDh963NVnDGvY3M4G5bzI8PFcnwysMMzH8gdfLmukT17zEHQltrXzEnh4WXBz4az3/XdxZeWOv4oqrFnzVFgwg3tqNRqtbL6gPgs46rkc+7XxuPSx+as31REYzEZrcuCyyaaqpxM3VBI0WJVtVylxsoFRHYBbcfSM1MHmR/C33J4tte69SwneONr62AT1Xo4A9LLtutOGZXyRrjRKhKUNUtdkRDgvZUTdPFS0jw1XnFKgcg76LmQuOiW3BeOiaHgluF5qPIglnGLm1lPioQASBqR9yfMbBpb4BPxHMTbTRcGXLXo4/nn1mcQjDRayrGgK+2gYAWDna5VPG1d/FlvDby+fHWeixx3JNkL320CkPdpYcUwY7C56aK5ds9I+UlGSBwQPugsqQbkTYRylBZWQUo9ZIvE+KVESLaISnOLE24LNtYWGEyODGglxNgFvsOo3UsLGyOzj84cm34W8EWxWzhbFv3jvSDug8m9fetFVUthe38FycvJMr4tePePaC6aHLezfgFSVtZndlYgxbDcmYx8QA63IgqsimedDYAdAsscPrp8pU0tyi51KhSguOUC5JsE427nAWvroFscFwFsbd7IO8evJabmPdZZ5fFNT4S2mgMjwM9tPesfVS3eT71s9pap0h3UYuRrp/BYavG7Nuv2Lp4pubrj5Lq9PE80QcocFRyKls43GqqzTXCyiFwlvoizaITwUNhB2iRxSAL19UHSFCSjJQJop1hRZky0o0BrZq2Buu8DuJsPkotDj0djnHeueA5KnmcAbX/8KLlBvqsp+fHXar+zP4m4tXCaXM1tmAWHUjqVEgbpcpuxvbqnmiw1W+pjNRzXK55bom2GpTMzrm19Ahkfz5dEJcnIVoHNTZSudrqmsyrSTcnFNlHJxQq0gslsisvIG0iId1PUb2tla54zNGtjwOmgPheybp3aFC8LKt56a7CdtZmvO9cHM1sA0X8BpwC2eGY1FWRHJo8cWniPdzC43w0upOD4oaeoZJc2be9iASLcLlY5fnl7gnJ8rpWIQ2IJ5XafEHh8D81n5qQX46Kxp8bjroHEHLMBq37x4Kvq8Vjp2Ne/vPPqN8ebj4BYTHLenRjnJO2gwTCA07ySwA68verbFsSayMlp0A08VyGv2gnn9Z7rdAbADoAE9g+LbqTK83ieMjgSbC/Bw8itf8+XusMuWba+qpRFCahzu/bMbcWm+jh4ciFz6urTNI550ub2HBW+O7Rum+jYMrbWJH54/hzWfBXRxY2e2PJZfRTxRw1BadPgmuSFa2Sols9LSKpDgnsypw63BTIp83msrg6MOTfVSyUt7JoFOt1HFTemxEJROQOKE0YTuZMNKO46fagRZVNPn1zDQeR81DEAA0NyorpL8yla8qu4w0nCMNOupQSO16XUd8xTDpUSFvQpTqmzIgLyUitOiOKG9kboymyxPY1SFy8UYYEpcAmWjFyisURehL0AcUlkMsqbb1KF70tQ/K+nnOXnIWnmkcU06P01a+J+dhsbEcL8RZJUVLpHZnEk/LwCjgr10td7V80O6LiminI1UTR5UpAQPKXOhJGlAUhKQoVIW6JruiBKCkaxikuLp8OVdTvsbdVOY5ZZR0YZbg+iAlKEiS6JpRWQN4os3+roI5u0FlKkYeCY3aUqbAuYmHMUoMKZc3VOUriaA0S5UVks0L2gFzSMwuL8x4J7LQHBNOSPcgJVyItLdNlE46JouTQ84pLoSV4FMxFNFOFybKCKvJbISUG8EVkIKK6CIUV02iBQCouSCxSoBLJCiuksgERBCiQBN4hWDXKuCnMcpyacdPtGqU2Td0BcVGm2zzUW7HVNhLf/AFdIbTnO5JIyOaZc5ebMVOj8l6ygZNS7yIHes0cOObx+Co3t6hWOB4ruJru0jfo77itFU7NxTkvjfbNqLagrHy8L2015Tph7LY09HHXUjBez2NynwIFkyzZp8bXGzXu6nkPBDRxTU7w8MI6gcCPJLPkmXr4eHHr2ytfQvhe5jxqD8R1Cgu0XScZoY6uDeNHeHxB5grB0WFVFVOYYIi+QceQb4uJ0AW/Dyecc3Lx+NVrigK20nZdiIbf6Bx9kPN/iRZZCtoZaeUxTRujkbxa75jqPFbsUdIrvA9k6uvu6CPuDQyPOVl+gPP3K0ruzPEIWF4bHMBqRG67vcCBf3IDILy8R10txHQqfg+DTVs25gaHPyl2rg3QWvqfNMIF+KS6157MsT/oo/wC8Z/FUeMbOVdFb0iFzATYO0c0npmGl0gqwlup+DYLNWzbmnaHPyl1iQ0WFuZ8wtB/sxxP+ij/vG/xTDHowjqqZ0Mr4pBZ8bi1w46g2Oqv8E2Grq1gkjjayM8HyHKHeLRqSPGyWxpnwhctTinZ7iFMwyGNsrG6kxOzEDrlIB+CpMHweatm3NOA5+UusSGiwtfU+aC0gJFfY1sdWUMQmqGNawuDdHhxuQSNB5FTW9nGIlgfu2Bpbm1kaLC19eiNmylkVkISpgTeKlNco7ApDCpp4n2orJtpS5lDaUQSZkAcUlymm1Kc66RoK8QlzBSqELlMw6ufE9uV5aLi/MWvrooZCQmyVx3DmWq6/S3ItcOHXwUl9E0hUuC1jXQxuuPVGq0EMoXl5Syuu36q3UgZewTfZjAPQpZbd+WeQk8yAbAfP4q6mjBafIqs7M/yY39LL+2V2fl+ubnu9JdLjMrsZnpCRuWQMeBbXMS25v/aWX7YaNu4pprd8PLL88pbe3xH2qdiOyrq3FKqRlVLTOYImfR8XAxg6kELLbe7LyUdNG99bNUh0mXLJew7pNxdx10Xa5nV8Do2w0cEbBYNjZ8ctyfeblVuxeMy1lK+WYguE0jBYW7oIt81eUn4pn9RvyWS7Mf8AgH/rEv3IDnXaPRtixWXKLB7WPIHUjU+8i6l9lX5UP6F/zah7Uvyqf0Mf3ouyr8qH9C/5tT+E6Zthj0lDBFLG1ri6djHB1/VcDe1jodE/tfSNlw2qa8AgRPcL8i1pcCPeE/jYpckfpmTJvW5M/Dea5ffx4qr27gqn0EwpnMAyHeNIOdzB6wYb2GngkbDdj1PeqqJPZia36zr/ALq64JgXuZ+c0NJ8nE2/ZK512O09qepk9qRrfqtv+8tNh1bmxiuiv6sVP++T+2EByzarDh+H3ROHdlniJ8RJlv8AMrs+Kz+j0c0kYAMUTy0W0GVpy6dNAub7dUuXH6F/9IYPi2a3ysuhbT/k6r/QSfsFAM7I4lJVYfBPKQZHg5iBYEh5F7e5YbZujbDtPVRsADQ2QgDgM2R1h8VncG7Qq2kpo4IoonRsBALmPJN3E6kHqSrTYHE5KrHZJ5QGvfE4kNBAFgwaA+ACA3+2GG+kspIbXDquMu/qta9zvsBTXaDivo2GTEGzpPom/wBvj/hDlpyBcX4jh8OS5l2xRybuldf6IOeCP+sgWPwDkBykcEt0iUBUR5ieCjsKdDkqcPArxKbzIgVKtiC8vNKVAOOeOqbL007im3J+KfJLzDqvF46qHdIUeI2uKDFXwHuOuPZPBbXCdp45LDNZ3Q/61XMQV4OssuTgxya4c1x9u5Q1wcLXTXZm/wD+OI5tmlB8Dmv965dg+0L4nAPJew6anUe9XdLtS/C6uR8Td5TznO+M92zvaYeRWfDx3jtl+q5cplJY2tLTyDaOd+VwiNM3XXKT3QPAnQqv7YP+Bh/TfuOUDEu14GO1NTua+4uZCLAX1sBxKz+2G3IxKCOIU5iyPz3L81+6RbgOq6WDtGGyB9PE4G4dGwj3tCzfZzTvjoXte0tPpEuhBGlwL6+RWC2V7R5KKIQTR76JujCDZ7R010IV5Xdr7MhFPTOzngZHANHjYan7EBnO094dizgPzY4wfO1/vCd7Kvyof0L/AJtWSqqt80r5pXZnvcXOPUqy2V2g/B1XvzGZRkczLmy8SNb2PRMnXO0HD5ailhZCx0jvSYyQ0XsAHXJ6DXitJiH4iW/DI/8AZK5v/tjH/Jn+9H/aqvHe1SWogfDFAIc7S0uL87sp0NtBY2SNsey2nyYUw+3JI77cv7qv6Z9H6bKIzH6WWje2/GZQBbN4atXMMA7Tm0dJFTilLt222beAXJJJNsviq2g253WKz1+4LhK0t3ee1vVt3ra+p05oDado8QbVYZOeDKgNJ8MzHfula/aKIvoaprQS4wyAAcSch0C5Ftdt4MSpmw+jGItkDw7Pm4Ai1rDqrPA+1d8UTY6qEyloAEjHAOIHtNPPxugNxsHAWYTTNe0tdldoRY6vcRofBZXBJA7aqrI9h497WsB+0JjFe10uYW0tOWvP58hBy+IaOJ8ysbsxtKaGtNU9hmc5rwRmyklxBLibHogO27RYh6OaR97B1VHG7yex7fmQoe3+Gek4XOALujG9b5s1P+HMucbVdofp9O2JtOYnNkbIHZ82rQeVh1Vye19pblfRE3FnfSjW4sfzUBzABEAkuLmwsLmw42HJG1UT1kQKQpQUAYKIFAiulobGCvXSAJbIG6ApslG9NnmmHrLyVv3pY/Wb/WQDa8pFb6/uUYcUgUp6asc9rQ43yiw8B0TKEoBSUl0qRAJdeKch9ceaerPX9yAi5khcvFTmfiP9dUwgheK8ESACyUpTxStSBbmyC6c/NQdfcgaJdaOkraMMia+OI2EQeSxxdqXiXXrbJb7FnCjHBBtEauiEcWWNhc1j75g4kv3JADxax+ksRqfcnGVlAZQXRxgAvtZjg3WNhaXixuM285HlyWXPBK3imTWMipTTPlyRiO79P52+/bYNJNwN2SADrx80j66hExLY4izNEPVeRk3jt4QCBY5C0cPidVkeYTo4hINLHV0AbAMjSWm78weSbNffNpqCcltT7k7h+IUjG07zkEoeHP8Aoz3Q7OHaAWIF2cz5LP8A8x70w1MNJDPRgRZ2xuILLjdvBuA7eF54FpOWwHDThZRsMqIG96YRuL3xXGRxDGZ3bwAcAbW4X4qoclCA09FiFJGKcta0OF87i1ziLseCXC2ouWczoOCzhJ/9aD3BC3giUm//2Q=="></img>{" "}
        </div>
      ) : (
        <AuctionDetailsPageData
          activeAuction={activeAuction}
          bid={highestBid}
          setBid={setBid}
          postBid={postBid}
          showErrorMessage={showErrorMessage}
          acceptedBid={acceptedBid}
        />
      )}
    </div>
  );
};

export default AuctionDetailsPage;
